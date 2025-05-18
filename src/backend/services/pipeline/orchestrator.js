/**
 * Pipeline Orchestrator
 * 
 * The central coordination system for the SEO engine pipeline.
 * Manages the flow of tasks through all stages of the pipeline.
 */

const TaskQueue = require('./taskQueue');
const AgentManager = require('./agentManager');
const logger = require('../../utils/logger');
const db = require('../../db/models');
const { Op } = require('sequelize');

class PipelineOrchestrator {
  constructor() {
    this.taskQueue = new TaskQueue();
    this.agentManager = new AgentManager();
    this.isRunning = false;
    this.processingInterval = null;
  }

  /**
   * Start the pipeline orchestrator
   */
  async start() {
    if (this.isRunning) {
      logger.warn('Pipeline orchestrator is already running');
      return;
    }

    logger.info('Starting pipeline orchestrator');
    this.isRunning = true;
    
    // Start processing tasks immediately
    this.processTasks();
    
    // Then set up interval for continuous processing
    this.processingInterval = setInterval(() => {
      this.processTasks();
    }, 5000); // Check for new tasks every 5 seconds
  }

  /**
   * Stop the pipeline orchestrator
   */
  async stop() {
    if (!this.isRunning) {
      logger.warn('Pipeline orchestrator is not running');
      return;
    }

    logger.info('Stopping pipeline orchestrator');
    this.isRunning = false;
    
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = null;
    }
  }

  /**
   * Process available tasks in the queue
   */
  async processTasks() {
    if (!this.isRunning) return;

    try {
      // Get all available agents
      const availableAgents = this.agentManager.getAvailableAgents();
      
      if (availableAgents.length === 0) {
        logger.debug('No available agents to process tasks');
        return;
      }

      // For each available agent, get a suitable task and process it
      for (const agent of availableAgents) {
        const task = await this.taskQueue.getNextTaskForAgentType(agent.type);
        
        if (!task) {
          logger.debug(`No pending tasks for agent type: ${agent.type}`);
          continue;
        }

        // Process the task with this agent
        this.agentManager.assignTaskToAgent(agent.id, task);
      }

      // Check if we need to generate new tasks
      await this.generateNewTasksIfNeeded();
    } catch (error) {
      logger.error('Error processing tasks', { error });
    }
  }

  /**
   * Generate new tasks if the queue is running low
   */
  async generateNewTasksIfNeeded() {
    try {
      const pendingTaskCount = await this.taskQueue.getPendingTaskCount();
      
      if (pendingTaskCount < 10) {
        logger.info('Generating new tasks as queue is running low');
        await this.generateNewTasks();
      }
    } catch (error) {
      logger.error('Error generating new tasks', { error });
    }
  }

  /**
   * Generate new tasks based on current priorities
   */
  async generateNewTasks() {
    try {
      // Find service+ZIP combinations that need pages
      const opportunities = await this.identifyOpportunities();
      
      for (const opportunity of opportunities) {
        // Create a new Scout task to start the pipeline for this opportunity
        await this.taskQueue.addTask({
          type: 'scout',
          priority: this.calculatePriority(opportunity),
          params: {
            serviceId: opportunity.serviceId,
            zipId: opportunity.zipId,
            keywords: opportunity.keywords
          }
        });
      }
    } catch (error) {
      logger.error('Error generating new tasks', { error });
    }
  }

  /**
   * Identify high-opportunity service+ZIP combinations
   */
  async identifyOpportunities() {
    // Get service categories
    const services = await db.ServiceCategory.findAll({
      limit: 5, // Start with a limited number of services
      order: [['priority', 'DESC']]
    });

    // Get target ZIP codes
    const zipCodes = await db.ZipCode.findAll({
      limit: 10, // Start with a limited number of ZIPs
      order: [['population', 'DESC']]
    });

    // Check which combinations don't have pages yet
    const opportunities = [];
    
    for (const service of services) {
      for (const zipCode of zipCodes) {
        const existingPage = await db.Page.findOne({
          where: {
            service_category_id: service.id,
            zip_code_id: zipCode.id
          }
        });
        
        if (!existingPage) {
          opportunities.push({
            serviceId: service.id,
            zipId: zipCode.id,
            keywords: service.keywords,
            priority: service.priority * zipCode.population // Simple priority calculation
          });
        }
      }
    }
    
    // Sort by priority
    return opportunities.sort((a, b) => b.priority - a.priority).slice(0, 20);
  }

  /**
   * Calculate priority score for an opportunity
   */
  calculatePriority(opportunity) {
    // This could be expanded with more sophisticated prioritization logic
    return opportunity.priority || 1;
  }

  /**
   * Handle completed task and create follow-up tasks
   */
  async handleTaskCompletion(task) {
    logger.info(`Task completed: ${task.id} (${task.type})`);
    
    try {
      if (task.type === 'scout') {
        // After Scout completes, create Analyst task
        await this.taskQueue.addTask({
          type: 'analyst',
          priority: task.priority,
          params: {
            ...task.params,
            scoutResults: task.result
          },
          parentTaskId: task.id
        });
      } 
      else if (task.type === 'analyst') {
        // After Analyst completes, create Creator task
        await this.taskQueue.addTask({
          type: 'creator',
          priority: task.priority,
          params: {
            ...task.params,
            analysisResults: task.result
          },
          parentTaskId: task.id
        });
      }
      else if (task.type === 'creator') {
        // After Creator completes, create parallel Artist and Optimizer tasks
        await Promise.all([
          this.taskQueue.addTask({
            type: 'artist',
            priority: task.priority,
            params: {
              ...task.params,
              content: task.result.content
            },
            parentTaskId: task.id
          }),
          this.taskQueue.addTask({
            type: 'optimizer',
            priority: task.priority,
            params: {
              ...task.params,
              content: task.result.content
            },
            parentTaskId: task.id
          })
        ]);
      }
      else if (task.type === 'artist' || task.type === 'optimizer') {
        // Check if both Artist and Optimizer are complete for this parent
        const parentId = task.parentTaskId;
        const siblingTasks = await db.Task.findAll({
          where: {
            parentTaskId: parentId,
            type: {
              [Op.in]: ['artist', 'optimizer']
            },
            status: 'completed'
          }
        });
        
        // If both are complete, create a Publisher task
        if (siblingTasks.length === 2) {
          // Get the original creator task
          const creatorTask = await db.Task.findByPk(parentId);
          
          // Get results from both artist and optimizer
          const artistTask = siblingTasks.find(t => t.type === 'artist');
          const optimizerTask = siblingTasks.find(t => t.type === 'optimizer');
          
          await this.taskQueue.addTask({
            type: 'publisher',
            priority: task.priority,
            params: {
              ...creatorTask.params,
              content: creatorTask.result.content,
              images: artistTask.result.images,
              seo: optimizerTask.result.seo
            },
            parentTaskId: parentId
          });
        }
      }
      else if (task.type === 'publisher') {
        // After Publisher completes, create Sentinel task
        await this.taskQueue.addTask({
          type: 'sentinel',
          priority: task.priority,
          params: {
            ...task.params,
            pageId: task.result.pageId,
            url: task.result.url
          },
          parentTaskId: task.id
        });
      }
      else if (task.type === 'sentinel') {
        // Sentinel monitors performance, may trigger optimization tasks later
        logger.info(`Monitoring task created for page ${task.params.pageId}`);
      }
    } catch (error) {
      logger.error('Error handling task completion', { error, taskId: task.id });
    }
  }

  /**
   * Handle failed task
   */
  async handleTaskFailure(task, error) {
    logger.error(`Task failed: ${task.id} (${task.type})`, { error });
    
    try {
      // Update task status
      await this.taskQueue.updateTaskStatus(task.id, 'failed', { error: error.message });
      
      // Check if we should retry
      if (task.retryCount < 3) {
        // Calculate exponential backoff
        const backoffMinutes = Math.pow(2, task.retryCount);
        const nextRetry = new Date();
        nextRetry.setMinutes(nextRetry.getMinutes() + backoffMinutes);
        
        // Create retry task
        await this.taskQueue.addTask({
          type: task.type,
          priority: task.priority - 1, // Lower priority for retries
          params: task.params,
          retryCount: task.retryCount + 1,
          nextRetryAt: nextRetry,
          parentTaskId: task.parentTaskId
        });
        
        logger.info(`Scheduled retry for task ${task.id} in ${backoffMinutes} minutes`);
      } else {
        logger.warn(`Task ${task.id} has failed ${task.retryCount} times, no more retries`);
      }
    } catch (retryError) {
      logger.error('Error handling task failure', { error: retryError, taskId: task.id });
    }
  }
}

module.exports = PipelineOrchestrator;
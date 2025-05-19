import { env } from './env';

// Pipeline task status enum
export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELED = 'canceled',
}

// Pipeline task priority enum
export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// Task type enum
export enum TaskType {
  // Scout tasks
  DATA_COLLECTION = 'data_collection',
  SERP_ANALYSIS = 'serp_analysis',
  COMPETITOR_ANALYSIS = 'competitor_analysis',
  LOCAL_DATA_COLLECTION = 'local_data_collection',
  
  // Analyst tasks
  DATA_PROCESSING = 'data_processing',
  OPPORTUNITY_ANALYSIS = 'opportunity_analysis',
  KEYWORD_ANALYSIS = 'keyword_analysis',
  LOCAL_MARKET_ANALYSIS = 'local_market_analysis',
  
  // Creator tasks
  CONTENT_GENERATION = 'content_generation',
  CONTENT_REVISION = 'content_revision',
  CONTENT_ENHANCEMENT = 'content_enhancement',
  
  // Artist tasks
  IMAGE_GENERATION = 'image_generation',
  IMAGE_OPTIMIZATION = 'image_optimization',
  
  // Optimizer tasks
  SEO_OPTIMIZATION = 'seo_optimization',
  SCHEMA_GENERATION = 'schema_generation',
  PAGE_OPTIMIZATION = 'page_optimization',
  
  // Publisher tasks
  DEPLOYMENT = 'deployment',
  PULL_REQUEST = 'pull_request',
  
  // Sentinel tasks
  PERFORMANCE_MONITORING = 'performance_monitoring',
  FEEDBACK_GENERATION = 'feedback_generation',
  
  // System tasks
  SYSTEM_MAINTENANCE = 'system_maintenance',
  ERROR_RECOVERY = 'error_recovery',
}

// Workflow type enum
export enum WorkflowType {
  NEW_PAGE = 'new_page',
  PAGE_UPDATE = 'page_update',
  PERFORMANCE_IMPROVEMENT = 'performance_improvement',
  SYSTEM_MAINTENANCE = 'system_maintenance',
  OPPORTUNITY_DISCOVERY = 'opportunity_discovery',
}

// Pipeline configuration
export const pipelineConfig = {
  // Task queue settings
  queue: {
    concurrency: env.AGENT_CONCURRENCY,
    retryDelay: 30000, // 30 seconds
    maxRetries: 3,
    timeout: 1800000, // 30 minutes
  },
  
  // Scheduler settings
  scheduler: {
    enabled: env.ENABLE_SCHEDULER,
    maxTasksPerRun: env.MAX_TASKS_PER_RUN,
    cronExpression: env.SCHEDULER_CRON_EXPRESSION,
  },
  
  // Performance targets
  performanceTargets: {
    taskCompletionRate: 0.95, // 95% of tasks should complete successfully
    averageTaskDuration: {
      [TaskType.DATA_COLLECTION]: 60000, // 1 minute
      [TaskType.SERP_ANALYSIS]: 120000, // 2 minutes
      [TaskType.COMPETITOR_ANALYSIS]: 300000, // 5 minutes
      [TaskType.LOCAL_DATA_COLLECTION]: 180000, // 3 minutes
      [TaskType.DATA_PROCESSING]: 240000, // 4 minutes
      [TaskType.OPPORTUNITY_ANALYSIS]: 300000, // 5 minutes
      [TaskType.KEYWORD_ANALYSIS]: 180000, // 3 minutes
      [TaskType.LOCAL_MARKET_ANALYSIS]: 240000, // 4 minutes
      [TaskType.CONTENT_GENERATION]: 600000, // 10 minutes
      [TaskType.CONTENT_REVISION]: 300000, // 5 minutes
      [TaskType.CONTENT_ENHANCEMENT]: 240000, // 4 minutes
      [TaskType.IMAGE_GENERATION]: 180000, // 3 minutes
      [TaskType.IMAGE_OPTIMIZATION]: 120000, // 2 minutes
      [TaskType.SEO_OPTIMIZATION]: 240000, // 4 minutes
      [TaskType.SCHEMA_GENERATION]: 120000, // 2 minutes
      [TaskType.PAGE_OPTIMIZATION]: 300000, // 5 minutes
      [TaskType.DEPLOYMENT]: 180000, // 3 minutes
      [TaskType.PULL_REQUEST]: 120000, // 2 minutes
      [TaskType.PERFORMANCE_MONITORING]: 300000, // 5 minutes
      [TaskType.FEEDBACK_GENERATION]: 240000, // 4 minutes
      [TaskType.SYSTEM_MAINTENANCE]: 600000, // 10 minutes
      [TaskType.ERROR_RECOVERY]: 300000, // 5 minutes
    },
  },
  
  // Workflow definitions
  workflows: {
    [WorkflowType.NEW_PAGE]: [
      {
        name: 'Initial Data Collection',
        taskType: TaskType.DATA_COLLECTION,
        agentType: 'scout',
        priority: TaskPriority.HIGH,
        dependencies: [],
      },
      {
        name: 'SERP Analysis',
        taskType: TaskType.SERP_ANALYSIS,
        agentType: 'scout',
        priority: TaskPriority.MEDIUM,
        dependencies: [],
      },
      {
        name: 'Competitor Analysis',
        taskType: TaskType.COMPETITOR_ANALYSIS,
        agentType: 'scout',
        priority: TaskPriority.MEDIUM,
        dependencies: ['SERP Analysis'],
      },
      {
        name: 'Local Data Collection',
        taskType: TaskType.LOCAL_DATA_COLLECTION,
        agentType: 'scout',
        priority: TaskPriority.HIGH,
        dependencies: [],
      },
      {
        name: 'Data Processing',
        taskType: TaskType.DATA_PROCESSING,
        agentType: 'analyst',
        priority: TaskPriority.HIGH,
        dependencies: ['Initial Data Collection', 'SERP Analysis', 'Competitor Analysis', 'Local Data Collection'],
      },
      {
        name: 'Keyword Analysis',
        taskType: TaskType.KEYWORD_ANALYSIS,
        agentType: 'analyst',
        priority: TaskPriority.HIGH,
        dependencies: ['Data Processing'],
      },
      {
        name: 'Content Generation',
        taskType: TaskType.CONTENT_GENERATION,
        agentType: 'creator',
        priority: TaskPriority.CRITICAL,
        dependencies: ['Data Processing', 'Keyword Analysis'],
      },
      {
        name: 'Image Generation',
        taskType: TaskType.IMAGE_GENERATION,
        agentType: 'artist',
        priority: TaskPriority.HIGH,
        dependencies: ['Content Generation'],
      },
      {
        name: 'SEO Optimization',
        taskType: TaskType.SEO_OPTIMIZATION,
        agentType: 'optimizer',
        priority: TaskPriority.HIGH,
        dependencies: ['Content Generation'],
      },
      {
        name: 'Schema Generation',
        taskType: TaskType.SCHEMA_GENERATION,
        agentType: 'optimizer',
        priority: TaskPriority.MEDIUM,
        dependencies: ['SEO Optimization'],
      },
      {
        name: 'Page Optimization',
        taskType: TaskType.PAGE_OPTIMIZATION,
        agentType: 'optimizer',
        priority: TaskPriority.HIGH,
        dependencies: ['SEO Optimization', 'Schema Generation', 'Image Generation'],
      },
      {
        name: 'Deployment',
        taskType: TaskType.DEPLOYMENT,
        agentType: 'publisher',
        priority: TaskPriority.CRITICAL,
        dependencies: ['Page Optimization'],
      },
      {
        name: 'Performance Monitoring',
        taskType: TaskType.PERFORMANCE_MONITORING,
        agentType: 'sentinel',
        priority: TaskPriority.MEDIUM,
        dependencies: ['Deployment'],
      },
    ],
    // Other workflow definitions would be defined here...
  },
};

export default pipelineConfig;

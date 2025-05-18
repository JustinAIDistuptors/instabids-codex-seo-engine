# Orchestrator Agent Prompts

This file contains specialized prompts for implementing the orchestration layer of the InstaBids SEO Engine.

## Task Queue Implementation

```
Implement a robust task queue system for the InstaBids SEO Engine that:

1. Manages tasks for all pipeline stages
2. Supports priority-based processing
3. Handles task dependencies
4. Implements retry mechanisms
5. Provides observability into the queue state

The implementation should use PostgreSQL for persistence to ensure no tasks are lost during system restarts. Include methods for adding tasks, retrieving the next highest priority task, updating task status, and handling failures.

Requirements:
- The taskQueue class should follow the Singleton pattern to ensure a single instance
- Tasks should have states: pending, processing, completed, failed
- Include exponential backoff for retries
- Implement proper error handling and logging
- Include methods to query task status and history
```

## Agent Coordination System

```
Implement the agent coordination system that orchestrates the work of specialized agents (Scout, Analyst, Creator, etc.). This system should:

1. Manage the lifecycle of agent tasks
2. Handle communication between agents
3. Track agent state and performance
4. Implement error recovery mechanisms
5. Optimize resource allocation

The implementation should be scalable to handle thousands of tasks across multiple agent types simultaneously.

Requirements:
- Create an AgentManager class that tracks all agent instances
- Implement agent status tracking (idle, busy, error)
- Include methods to assign tasks to appropriate agent types
- Implement proper error handling with recovery strategies
- Add monitoring and performance tracking
- Include resource controls to prevent overwhelming the system
```

## Pipeline Workflow Implementation

```
Implement the core pipeline workflow engine that manages the end-to-end process of generating and optimizing SEO pages. This workflow should:

1. Coordinate the sequence of steps from data acquisition to deployment
2. Handle branch points for different service types
3. Implement state persistence for long-running workflows
4. Provide progress tracking and visibility
5. Support cancellation and pausing of workflows

The implementation should be resilient to failures at any stage and able to resume from the last successful state.

Requirements:
- Create a PipelineOrchestrator class that acts as the central controller
- Implement methods to start, stop, pause, and resume the pipeline
- Create clear task handoffs between agents
- Implement proper error handling at every stage
- Add comprehensive logging for pipeline operations
- Include methods to identify high-value service+ZIP combinations
```

## Performance Monitoring System

```
Implement the performance monitoring system that tracks the health and efficiency of the entire SEO engine. This system should:

1. Collect metrics on all pipeline stages
2. Track agent performance and throughput
3. Monitor system resource utilization
4. Identify bottlenecks and performance issues
5. Generate alerts for anomalous conditions

The implementation should include dashboards for real-time monitoring and historical analysis of performance data.

Requirements:
- Create a MetricsCollector class that gathers data from all components
- Implement methods to track task throughput, success rates, and durations
- Add agent-specific metrics (e.g., content generation quality, indexation rates)
- Include resource utilization monitoring (CPU, memory, API usage)
- Implement alerting for critical issues (failed tasks, resource exhaustion)
- Create API endpoints for dashboard integration
```

## Task Scheduling Implementation

```
Implement the task scheduling system that manages when and how tasks are executed. This system should:

1. Support immediate and scheduled task execution
2. Implement cron-like recurring tasks
3. Handle task priorities and dependencies
4. Optimize resource utilization across time
5. Support pausing and resuming scheduled tasks

The implementation should ensure that high-priority tasks are executed promptly while maintaining a balanced workload.

Requirements:
- Create a TaskScheduler class that works with the task queue
- Implement methods for one-time and recurring task scheduling
- Add support for time-based and event-based triggers
- Include methods to calculate optimal execution times
- Implement concurrency controls to prevent system overload
- Add support for maintenance windows and scheduled downtime
```

## Error Recovery System

```
Implement the error recovery system that handles failures at all levels of the pipeline. This system should:

1. Detect and classify different types of errors
2. Implement appropriate recovery strategies
3. Track failed tasks and recovery attempts
4. Provide visibility into error patterns
5. Support automatic and manual intervention

The implementation should maximize system resilience and minimize human intervention.

Requirements:
- Create an ErrorHandler class with specialized strategies for different error types
- Implement exponential backoff for retries
- Add circuit breaker patterns for external services
- Include dead-letter queues for unrecoverable tasks
- Create hooks for manual intervention in critical failures
- Add comprehensive logging and alerting for errors
```

## Pipeline Configuration Management

```
Implement the configuration management system that controls the behavior of the pipeline. This system should:

1. Manage settings for all pipeline components
2. Support runtime configuration changes
3. Implement configuration validation
4. Provide defaults for all settings
5. Track configuration history

The implementation should allow for flexible customization while preventing invalid configurations.

Requirements:
- Create a ConfigManager class that loads and validates configurations
- Implement a layered approach (default, environment, database, runtime)
- Add methods for safely updating configurations
- Include validation rules for all configuration options
- Create API endpoints for the admin dashboard
- Implement proper access controls for configuration changes
```
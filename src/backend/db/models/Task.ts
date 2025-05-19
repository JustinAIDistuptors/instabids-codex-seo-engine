import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/database';
import { TaskStatus, TaskPriority, TaskType } from '../../config/pipeline';

// Task attributes interface
export interface TaskAttributes {
  id: string;
  name: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  agentType: string;
  agentId: string | null;
  workflowId: string | null;
  parentTaskId: string | null;
  parameters: Record<string, any>;
  result: Record<string, any> | null;
  error: string | null;
  startTime: Date | null;
  endTime: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Optional attributes for task creation
export interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'status' | 'agentId' | 'result' | 'error' | 'startTime' | 'endTime' | 'createdAt' | 'updatedAt'> {}

// Task model class definition
export class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: string;
  public name!: string;
  public type!: TaskType;
  public status!: TaskStatus;
  public priority!: TaskPriority;
  public agentType!: string;
  public agentId!: string | null;
  public workflowId!: string | null;
  public parentTaskId!: string | null;
  public parameters!: Record<string, any>;
  public result!: Record<string, any> | null;
  public error!: string | null;
  public startTime!: Date | null;
  public endTime!: Date | null;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
  // Calculated properties
  public get durationMs(): number | null {
    if (this.startTime && this.endTime) {
      return this.endTime.getTime() - this.startTime.getTime();
    }
    return null;
  }
  
  public get isComplete(): boolean {
    return this.status === TaskStatus.COMPLETED;
  }
  
  public get isFailed(): boolean {
    return this.status === TaskStatus.FAILED;
  }
  
  public get isPending(): boolean {
    return this.status === TaskStatus.PENDING;
  }
  
  public get isInProgress(): boolean {
    return this.status === TaskStatus.IN_PROGRESS;
  }
  
  public get isCanceled(): boolean {
    return this.status === TaskStatus.CANCELED;
  }
}

// Initialize Task model
Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(TaskType)),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TaskStatus)),
      allowNull: false,
      defaultValue: TaskStatus.PENDING,
    },
    priority: {
      type: DataTypes.ENUM(...Object.values(TaskPriority)),
      allowNull: false,
      defaultValue: TaskPriority.MEDIUM,
    },
    agentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agentId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    workflowId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    parentTaskId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    parameters: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    result: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    error: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    indexes: [
      {
        name: 'tasks_status_idx',
        fields: ['status'],
      },
      {
        name: 'tasks_workflow_id_idx',
        fields: ['workflowId'],
      },
      {
        name: 'tasks_agent_type_idx',
        fields: ['agentType'],
      },
      {
        name: 'tasks_parent_task_id_idx',
        fields: ['parentTaskId'],
      },
    ],
  }
);

// Task model class methods

// Start a task
Task.prototype.start = async function(agentId: string): Promise<Task> {
  this.status = TaskStatus.IN_PROGRESS;
  this.agentId = agentId;
  this.startTime = new Date();
  return this.save();
};

// Complete a task
Task.prototype.complete = async function(result: Record<string, any>): Promise<Task> {
  this.status = TaskStatus.COMPLETED;
  this.result = result;
  this.endTime = new Date();
  return this.save();
};

// Fail a task
Task.prototype.fail = async function(error: string): Promise<Task> {
  this.status = TaskStatus.FAILED;
  this.error = error;
  this.endTime = new Date();
  return this.save();
};

// Cancel a task
Task.prototype.cancel = async function(): Promise<Task> {
  this.status = TaskStatus.CANCELED;
  this.endTime = new Date();
  return this.save();
};

// Reset a task for retry
Task.prototype.reset = async function(): Promise<Task> {
  this.status = TaskStatus.PENDING;
  this.agentId = null;
  this.startTime = null;
  this.endTime = null;
  this.error = null;
  return this.save();
};

export default Task;

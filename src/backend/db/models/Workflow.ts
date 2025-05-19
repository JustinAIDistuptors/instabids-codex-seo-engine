import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/database';
import { WorkflowType } from '../../config/pipeline';

// Workflow status enum
export enum WorkflowStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELED = 'canceled',
}

// Workflow attributes interface
export interface WorkflowAttributes {
  id: string;
  name: string;
  type: WorkflowType;
  status: WorkflowStatus;
  parameters: Record<string, any>;
  result: Record<string, any> | null;
  error: string | null;
  progress: number; // 0-100
  startTime: Date | null;
  endTime: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Optional attributes for workflow creation
export interface WorkflowCreationAttributes extends Optional<WorkflowAttributes, 'id' | 'status' | 'result' | 'error' | 'progress' | 'startTime' | 'endTime' | 'createdAt' | 'updatedAt'> {}

// Workflow model class definition
export class Workflow extends Model<WorkflowAttributes, WorkflowCreationAttributes> implements WorkflowAttributes {
  public id!: string;
  public name!: string;
  public type!: WorkflowType;
  public status!: WorkflowStatus;
  public parameters!: Record<string, any>;
  public result!: Record<string, any> | null;
  public error!: string | null;
  public progress!: number;
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
    return this.status === WorkflowStatus.COMPLETED;
  }
  
  public get isFailed(): boolean {
    return this.status === WorkflowStatus.FAILED;
  }
  
  public get isPending(): boolean {
    return this.status === WorkflowStatus.PENDING;
  }
  
  public get isInProgress(): boolean {
    return this.status === WorkflowStatus.IN_PROGRESS;
  }
  
  public get isCanceled(): boolean {
    return this.status === WorkflowStatus.CANCELED;
  }
}

// Initialize Workflow model
Workflow.init(
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
      type: DataTypes.ENUM(...Object.values(WorkflowType)),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(WorkflowStatus)),
      allowNull: false,
      defaultValue: WorkflowStatus.PENDING,
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
    progress: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      },
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
    modelName: 'Workflow',
    tableName: 'workflows',
    indexes: [
      {
        name: 'workflows_status_idx',
        fields: ['status'],
      },
      {
        name: 'workflows_type_idx',
        fields: ['type'],
      },
    ],
  }
);

// Workflow model class methods

// Start a workflow
Workflow.prototype.start = async function(): Promise<Workflow> {
  this.status = WorkflowStatus.IN_PROGRESS;
  this.startTime = new Date();
  return this.save();
};

// Update workflow progress
Workflow.prototype.updateProgress = async function(progress: number): Promise<Workflow> {
  this.progress = Math.min(Math.max(progress, 0), 100); // Ensure 0-100 range
  return this.save();
};

// Complete a workflow
Workflow.prototype.complete = async function(result: Record<string, any>): Promise<Workflow> {
  this.status = WorkflowStatus.COMPLETED;
  this.result = result;
  this.progress = 100;
  this.endTime = new Date();
  return this.save();
};

// Fail a workflow
Workflow.prototype.fail = async function(error: string): Promise<Workflow> {
  this.status = WorkflowStatus.FAILED;
  this.error = error;
  this.endTime = new Date();
  return this.save();
};

// Cancel a workflow
Workflow.prototype.cancel = async function(): Promise<Workflow> {
  this.status = WorkflowStatus.CANCELED;
  this.endTime = new Date();
  return this.save();
};

export default Workflow;

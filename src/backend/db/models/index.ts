import Task from './Task';
import Workflow from './Workflow';

// Define model associations
Task.belongsTo(Workflow, {
  foreignKey: 'workflowId',
  as: 'workflow',
  onDelete: 'CASCADE',
});

Workflow.hasMany(Task, {
  foreignKey: 'workflowId',
  as: 'tasks',
});

Task.belongsTo(Task, {
  foreignKey: 'parentTaskId',
  as: 'parentTask',
});

Task.hasMany(Task, {
  foreignKey: 'parentTaskId',
  as: 'subtasks',
});

// Export all models
export {
  Task,
  Workflow,
};

// Export default object with all models
export default {
  Task,
  Workflow,
};

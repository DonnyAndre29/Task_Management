// Import Sequelize and define the Task model
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  dueDate: {
    type: DataTypes.DATE,
    get() {
      const rawDate = this.getDataValue('dueDate');
      return format(rawDate, 'yyyy-MM-dd');
    }
  },
  status: {
    type: DataTypes.ENUM('todo', 'inProgress', 'done'),
    defaultValue: 'todo'
  }
});

// Define functions to interact with the Task model

// const createTask = async (taskData) => {
//   try {
//     const newTask = await Task.create(taskData);
//     return newTask;
//   } catch (error) {
//     console.error('Error creating task:', error);
//     return null;
//   }
// };

// Formatted the "createTask function" to added the date function 

const { format } = require('date-fns');

const createTask = async (taskData) => {
  try {
    const currentDate = new Date();
    const formattedDueDate = format(currentDate, 'yyyy-MM-dd');
    
    const newTask = await Task.create({ ...taskData, dueDate: formattedDueDate });
    return newTask;
  } catch (error) {
    console.error('Error creating task:', error);
    return null;
  }
};

const getTasks = async () => {
  try {
    const tasks = await Task.findAll();
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const task = await Task.findByPk(taskId);
    if (task) {
      task.status = newStatus;
      await task.save();
      return task;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error updating task status:', error);
    return null;
  }
};

// Export the Task model and functions for use in the Controller
module.exports = {
  Task,
  createTask,
  getTasks,
  updateTaskStatus
};
// Import Sequelize and define the Task model
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define the Task model
const { format } = require('date-fns');
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
      return format(rawDate, 'yyyy-MM-dd'); // Assuming you have the format function available
    }
  },
  status: {
    type: DataTypes.ENUM('todo', 'inProgress', 'done'),
    defaultValue: 'todo'
  }
});

// Other functions (getTasks, updateTaskStatus) remain unchanged

// Export the Task model and functions for use in the Controller module
module.exports = { Task, createTask, getTasks, updateTaskStatus };

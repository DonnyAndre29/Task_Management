const { Task } = require('./models/task');

const createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Error creating task' });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { newStatus } = req.body;

  try {
    const task = await Task.findByPk(taskId);
    if (task) {
      task.status = newStatus;
      await task.save();
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Error updating task status' });
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findByPk(taskId);
    if (task) {
      await task.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Error deleting task' });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask
};
// Import express and mongoose modules
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');


// Task will be located in database

// Create an express app
const app = express();
const PORT = process.env.PORT || 3001;


// Use JSON middleware to parse request body
app.use(express.json());
app.use(routes);

// Define a GET route to fetch all tasks
app.get('/tasks', async (req, res) => {
  try {
    // Find all tasks from the database
    const tasks = await Task.find();
    // Send the tasks as JSON response
    res.json(tasks);
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: err.message });
  }
});

// Define a POST route to create a new task
app.post('/tasks', async (req, res) => {
  try {
    // Create a new task from the request body
    const task = new Task(req.body);
    // Save the task to the database
    await task.save();
    // Send the task as JSON response
    res.json(task);
  } catch (err) {
    // Handle any errors
    res.status(400).json({ message: err.message });
  }
});

// Define a PUT route to update an existing task
app.put('/tasks/:id', async (req, res) => {
  try {
    // Find the task by id from the database
    const task = await Task.findById(req.params.id);
    // Update the task with the request body
    Object.assign(task, req.body);
    // Save the task to the database
    await task.save();
    // Send the task as JSON response
    res.json(task);
  } catch (err) {
    // Handle any errors
    res.status(404).json({ message: err.message });
  }
});

// Define a DELETE route to delete an existing task
app.delete('/tasks/:id', async (req, res) => {
  try {
    // Delete the task by id from the database
    await Task.findByIdAndDelete(req.params.id);
    // Send a success message as JSON response
    res.json({ message: 'Task deleted' });
  } catch (err) {
    // Handle any errors
    res.status(404).json({ message: err.message });
  }
});

// Start the server on port 3000
app.listen(PORT, () => {
  console.log('Server running');
});

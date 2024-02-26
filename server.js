const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const users = require('./config/connecton');
const OAuth2 = google.auth.OAuth2;


const app = express();
const PORT = process.env.PORT || 3001;

// OAuth2 client configuration
const oauth2Client = new OAuth2(
  '133215348062-il5siql9vkrjp1ou308lohteukgi2etc.apps.googleusercontent.com',
  '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',
  'http://localhost:3001/google/redirect'
);

// Generate a URL that asks permissions for Google Tasks scope
const scopes = ['https://www.googleapis.com/auth/tasks'];
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

// Configure body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to initiate OAuth 2.0 authentication flow
app.get('/google/auth', (req, res) => {
  res.redirect(authUrl);
});

// Callback endpoint to handle the OAuth 2.0 callback
app.get('/google/redirect', async (req, res) => {
  console.log(req.query); // Log the request query parameters
  const code = req.query.code; // Extract the 'code' parameter from the query string

  try {
    if (!code) {
      throw new Error('Authorization code missing');
    }

    // Exchange authorization code for access token
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Use the access token to make requests to the Google Tasks API
    const tasks = google.tasks({ version: 'v1', auth: oauth2Client });
    // Example: Retrieve task lists
    const taskLists = await tasks.tasklists.list();
    res.json(taskLists.data);
  } catch (error) {
    console.error('Error exchanging authorization code for access token:', error.message);
    res.status(500).json({ error: error.message });
  }
});

//Imported the creatUser function 
app.post('/api/signup', function (req, res) {
  users.createUser(req.body);
  res.send('User signup success');
});

app.post('/api/signin', async function (req, res) {
  const { email, password } = req.body;

  // Find the user in the database based on the provided username
  const userMod = await users.findUserByEmail(email);

  if (userMod.password == password) {
    // If username and password are correct, send a success message
    res.send('User signed in successfully');
  } else {
    res.status(500).json({ error: 'password incorrect' });
  }


});



// Endpoint to retrieve tasks within a specific task list
app.get('/google/tasks/:taskListId', async (req, res) => {
  try {
    const taskListId = req.params.taskListId;
    const tasks = google.tasks({ version: 'v1', auth: oauth2Client });
    const response = await tasks.tasks.list({
      tasklist: taskListId
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error retrieving tasks:', error.message);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

// Endpoint to create a new task within a specific task list
app.post('/google/tasks/:taskListId', async (req, res) => {
  try {
    const taskListId = req.params.taskListId;
    const { title, notes } = req.body;
    const tasks = google.tasks({ version: 'v1', auth: oauth2Client });
    const response = await tasks.tasks.insert({
      tasklist: taskListId,
      requestBody: {
        title: title,
        notes: notes
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Endpoint to update an existing task
app.put('/google/tasks/:taskListId/:taskId', async (req, res) => {
  try {
    const taskListId = req.params.taskListId;
    const taskId = req.params.taskId;
    const { title, notes } = req.body;
    const tasks = google.tasks({ version: 'v1', auth: oauth2Client });
    const response = await tasks.tasks.update({
      tasklist: taskListId,
      task: taskId,
      requestBody: {
        title: title,
        notes: notes
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Endpoint to delete an existing task
app.delete('/google/tasks/:taskListId/:taskId', async (req, res) => {
  try {
    const taskListId = req.params.taskListId;
    const taskId = req.params.taskId;
    const tasks = google.tasks({ version: 'v1', auth: oauth2Client });
    await tasks.tasks.delete({
      tasklist: taskListId,
      task: taskId
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
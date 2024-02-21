// Import express modules
const express = require('express');
const routes = require('./routes/index');
const authMiddleware = require('./middleware/auth');




// Create an express app
const app = express();
const PORT = process.env.PORT || 3001;


// Use JSON middleware to parse request body
app.use(express.json());
app.use(routes);
app.use(authMiddleware);




// const tasks = google.tasks({ version: 'v1', auth: oauth2Client });

// // Example: List task lists
// const taskLists = await tasks.tasklists.list();
// console.log('Task lists:', taskLists.data.items);

// // Example: Create a new task
// await tasks.tasks.insert({
//   tasklist: 'YOUR_TASKLIST_ID',
//   resource: { title: 'My New Task' },
// });



app.listen(PORT, console.log(`server is listening on port ${PORT}`))
 

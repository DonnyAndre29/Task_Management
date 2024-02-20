// Import express modules
const express = require('express');
const routes = require('./routes');
// const authMiddleware = require('./middleware/auth');
require('dotenv').config()



// Create an express app
const app = express();
const PORT = process.env.PORT || 3001;


// Use JSON middleware to parse request body
app.use(express.json());
app.use(routes);
// app.use('/api/tasks', authMiddleware);



app.listen(PORT, console.log(`server is listening on port ${PORT}`))
 

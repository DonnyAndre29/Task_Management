// const passport = require('passport');
// const cookieSession = require('cookie-session');
// const expressSession = require('express-session')
// const tasks = require('./routes/tasks')
// const { google } = require('googleapis');
// const users = require('./config/connecton');
// const OAuth2 = google.auth.OAuth2;

// app.use(cookieSession({
    //   name: 'google-auth-session',
    //   keys: ['key1', 'key2']
    // }))
    
    // app.use(function(request, response, next) {
    //     if (request.session && !request.session.regenerate) {
    //         request.session.regenerate = (cb) => {
    //             cb()
    //         }
    //     }
    //     if (request.session && !request.session.save) {
    //         request.session.save = (cb) => {
    //             cb()
    //         }
    //     }
    //     next()
    // })
    
    // const isLoggedIn = (req, res, next) => {
    //     if (req.user) {
    //         next();
    //     } else {
    //         res.sendStatus(401);
    //     }
    // }
    
    // app.use(passport.initialize());
    // app.use(passport.session());
    
    // app.get('/', (req, res) => {
    //     res.sendFile(__dirname + '/assets/homepage.html');
    //   })
    
    
    // app.get("/failed", (req, res) => {
    //     res.send("Failed")
    // })
    
    
    // app.get("/success",isLoggedIn, (req, res) => {
    //     res.send(`Welcome ${req.user.email}`)
    // })
    
    // app.get('/google',
    //     passport.authenticate('google', {
    //             scope:
    //                 ['email', 'profile']
    //         }
    //     ));
    
    // app.get('/google/callback',
    //     passport.authenticate('google', {
    //         failureRedirect: '/failed',
    //     }),
    //     function (req, res) {
    //         res.redirect('/success')
    
    //     }
    // );
    
    // app.get("/logout", (req, res) => {
    //     req.session = null;
    //     req.logout();
    //     res.redirect('/');
    // })
    


// // Route to Login Page
// app.get('/signup', (req, res) => {
//   res.redirect(req.url + '/assets/signup.html');
// });


// app.post('/signup', (req, res) => {
//   // Insert Login Code Here
//   let username = req.body.username;
//   let password = req.body.password;
//   res.send(`Username: ${username} Password: ${password}`);
// });

// Configure body parser middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());




// // Endpoint to initiate OAuth 2.0 authentication flow
// app.get('/google/auth', (req, res) => {
//   res.redirect(authUrl);
// });

// // Callback endpoint to handle the OAuth 2.0 callback
// app.get('/google/redirect', async (req, res) => {
//   console.log(req.query); // Log the request query parameters
//   const code = req.query.code; // Extract the 'code' parameter from the query string

//   try {
//     if (!code) {
//       throw new Error('Authorization code missing');
//     }

//     // Exchange authorization code for access token
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);

//     // Use the access token to make requests to the Google Tasks API
//     const tasks = google.tasks({ version: 'v1', auth: oauth2Client });
//     // Example: Retrieve task lists
//     const taskLists = await tasks.tasklists.list();
//     res.json(taskLists.data);
//   } catch (error) {
//     console.error('Error exchanging authorization code for access token:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// //Imported the creatUser function 
// app.post('/api/signup', function (req, res) {
//   users.createUser(req.body);
//   res.send('User signup success');
// });

// app.post('/api/signin', async function (req, res) {
//   const { email, password } = req.body;

//   // Find the user in the database based on the provided username
//   const userMod = await users.findUserByEmail(email);

//   if (userMod.password == password) {
//     // If username and password are correct, send a success message
//     res.send('User signed in successfully');
//   } else {
//     res.status(500).json({ error: 'password incorrect' });
//   }


// });



// // Endpoint to retrieve tasks within a specific task list
// app.get('/google/tasks/:taskListId', async (req, res) => {
//   try {
//     const taskListId = req.params.taskListId;
//     const tasks = google.tasks({ version: 'v1', auth: oauth2Client });
//     const response = await tasks.tasks.list({
//       tasklist: taskListId
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error retrieving tasks:', error.message);
//     res.status(500).json({ error: 'Failed to retrieve tasks' });
//   }
// });

// // Endpoint to create a new task within a specific task list
// app.post('/google/tasks/:taskListId', async (req, res) => {
//   try {
//     const taskListId = req.params.taskListId;
//     const { title, notes } = req.body;
//     const tasks = google.tasks({ version: 'v1', auth: oauth2Client });
//     const response = await tasks.tasks.insert({
//       tasklist: taskListId,
//       requestBody: {
//         title: title,
//         notes: notes
//       }
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error creating task:', error.message);
//     res.status(500).json({ error: 'Failed to create task' });
//   }
// });

// // Endpoint to update an existing task
// app.put('/google/tasks/:taskListId/:taskId', async (req, res) => {
//   try {
//     const taskListId = req.params.taskListId;
//     const taskId = req.params.taskId;
//     const { title, notes } = req.body;
//     const tasks = google.tasks({ version: 'v1', auth: oauth2Client });
//     const response = await tasks.tasks.update({
//       tasklist: taskListId,
//       task: taskId,
//       requestBody: {
//         title: title,
//         notes: notes
//       }
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error updating task:', error.message);
//     res.status(500).json({ error: 'Failed to update task' });
//   }
// });

// // Endpoint to delete an existing task
// app.delete('/google/tasks/:taskListId/:taskId', async (req, res) => {
//   try {
//     const taskListId = req.params.taskListId;
//     const taskId = req.params.taskId;
//     const tasks = google.tasks({ version: 'v1', auth: oauth2Client });
//     await tasks.tasks.delete({
//       tasklist: taskListId,
//       task: taskId
//     });
//     res.json({ success: true });
//   } catch (error) {
//     console.error('Error deleting task:', error.message);
//     res.status(500).json({ error: 'Failed to delete task' });
//   }
// });


// const { Sequelize, DataTypes } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize('task_management_db', 'root', '217Arundel', {
//   host: 'localhost',
//   dialect: 'mysql'
// });



// const users = sequelize.define('users', {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING
//   },
//   password: {
//     type: DataTypes.STRING
//   }
// });

// users.up

// const createUser = async (userData) => {
//   try {
//     const newUser = await users.create({
//       username: userData.username,
//       email: userData.email,
//       password: userData.password
//     });
//   } catch (error) {
//     console.log(error);


// const findUserByEmail = (_email) => {
//   return users.findOne({
//     where: { email: _email }
//   });
// };

// const deleteUser = async (userId) => {
//   try {
//     const deletedUser = await users.destroy({
//       where: {
//         id: userId
//       }
//     });

//     if (deletedUser === 1) {
//       console.log('User deleted successfully');
//     } else {
//       console.log('User not found');
//     }
//   } catch (error) {
//     console.log(error);
//   }

// };


// module.exports = {
//   createUser,
//   deleteUser,
//   findUserByEmail
// }}};
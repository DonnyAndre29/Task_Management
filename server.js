const express = require('express');
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const homeRoutes = require('./routes/homeRoute');
const googleLogin = require('./routes/googleRoutes');
const dashBoard = require('./routes/dashboard')


const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.static(path.join(__dirname, 'assets')))
app.set('views', __dirname + '/assets/views')
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)



app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET 
}));





app.use(homeRoutes);
app.use(googleLogin);
app.use(dashBoard);






app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
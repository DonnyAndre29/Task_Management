const express = require('express');
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const Routes = require('./routes/homeRoute');
// const googleLogin = require('./routes/googleRoutes')


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





app.use(Routes);
// app.use(googleLogin);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
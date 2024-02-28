const express = require('express');
const session = require('express-session');
const { google } = require('googleapis');
require('dotenv').config()


const app = express();


const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );
  
  app.get('/auth', (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/tasks'],
    });
    res.redirect(authUrl);
  });
  
  app.get('/callback', async (req, res) => {
    const { code } = req.query;
    const { tokens } = oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    // Now you can make API requests using the authenticated client.
  });


// Configure session middleware
app.use(express.static());
app.use(session({
    secret: process.env.CLIENT_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false, 
    },
}));







module.exports = oauth2Client;
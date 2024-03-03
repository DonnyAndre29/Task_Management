// const express = require('express');
// const session = require('express-session');
// const { google } = require('googleapis');

const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        reDirectURL: process.env.REDIRECT_URL,
        callbackURL: process.env.CALLBACK_URL,
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));
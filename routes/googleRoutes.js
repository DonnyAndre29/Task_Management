const express = require('express');
const router = express();
const passport = require('passport');
require('../config/connection');
require('dotenv').config();

const userController = require('../controller/user-controller');



  

router.use(passport.initialize()); 
router.use(passport.session());


// process.env.WEBSITE_URL
router.get('https://task-flow-b7fd9bbf60ad.herokuapp.com/', userController.loadAuth);

// Auth 
router.get('/auth/google' , passport.authenticate('google', { scope: 
	[ 'email', 'profile' ] 
})); 


// Auth Callback 
router.get('/auth/google/callback', 
	passport.authenticate( 'google', { 
        successRedirect: '/success', 
		failureRedirect: '/failure'
}));

// Success 
router.get('/success' , userController.successGoogleLogin); 

// failure 
router.get('/failure' , userController.failureGoogleLogin);

module.exports = router;
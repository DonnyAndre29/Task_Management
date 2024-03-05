const express = require('express');
const router = express();
const passport = require('passport');
require('../config/connecton');
require('dotenv').config();

const userController = require('../controller/user-controller');




router.use(passport.initialize()); 
router.use(passport.session());


router.get('/', userController.loadAuth);

// Auth 
router.get('/auth/google' , passport.authenticate('google', { scope: 
	[ 'email', 'profile' ] 
})); 


// Auth Callback 
router.get( '/auth/google/callback', 
	passport.authenticate( 'google', { 
        successRedirect: '/success', 
		failureRedirect: '/failure'
}));

// Success 
router.get('/success' , userController.successGoogleLogin); 

// failure 
router.get('/failure' , userController.failureGoogleLogin);

module.exports = router;
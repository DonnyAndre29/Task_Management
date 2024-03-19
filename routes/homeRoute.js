const router = require('express').Router();
require('dotenv').config();
const passport = require('passport');
require('../config/connection');


const userController = require('../controller/user-controller');

router.use(passport.initialize()); 
router.use(passport.session());

router.get(process.env.WEBSITE_URL, userController.loadAuth);

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

router.get('/', (req, res) => {
    res.render('homepage.html')
  })

router.get('/dashboard', (req, res) => {
    res.render('task-flow.html')
})

router.get('/signup', (req, res) => {
    res.render('signup.html')
  })

router.get('/logout', (req, res) => {
   
  res.redirect('/');
    
});

  module.exports = router;
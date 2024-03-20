const passport = require('passport');
// require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth2').Strategy; 

passport.serializeUser((user , done) => { 
	done(null , user); 
}) 
passport.deserializeUser(function(user, done) { 
	done(null, user); 
}); 

passport.use(new GoogleStrategy({ 
	clientID: '133215348062-il5siql9vkrjp1ou308lohteukgi2etc.apps.googleusercontent.com', 
	clientSecret: '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',
	callbackURL: 'https://task-flow-b7fd9bbf60ad.herokuapp.com/auth/google/callback',
	passReqToCallback:true
}, 

function(request, accessToken, refreshToken, profile, done) { 
	return done(null, profile); 
} 
));


  
  
  


const router = require('express').Router();
const logOut = require('./logout')



router.get('/', (req, res) => {
  res.render('homepage.html')
})

router.get('/signup', (req, res) => {
  res.render('signup.html')
})

router.get('/dashboard', (req, res) => {
  res.render('task-flow.html')
})

// router.get('/logout', (req, res) => {
   
//   res.redirect('/');
    
// });


  module.exports = router;
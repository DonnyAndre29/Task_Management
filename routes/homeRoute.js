const router = require('express').Router();
require('dotenv').config();



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
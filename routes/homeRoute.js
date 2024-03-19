const router = require('express').Router();




router.get('/', (req, res) => {
    res.render('homepage.html')
  })

router.get('/login', (req, res) => {
    res.render('login.html')
})

router.get('/signup', (req, res) => {
    res.render('signup.html')
  })

router.get('/task-flow', (req, res) => {
    res.render('task-flow.html')
  })

// router.post('/signup', (req, res) => {
//     if (req.session.logged_in) {
//       res.redirect('/task-flow');
//       return;
//     }
//     res.render('task-flow')
  // })
 
  router.get('/logout', (req, res) => {
    // Clear the user's session (or JWT token, if applicable)
    // req.session.destroy(); // Example for session-based authentication

    // // Redirect the user to the login page (or any other desired page)
    res.redirect('/');
    
});

  module.exports = router;
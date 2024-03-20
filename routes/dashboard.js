const router = require('express').Router();
const tasks = require('../controller/tasks')

// router.get('/success', (req, res) => {
//     res.send('task-flow')
//   })



router.get('/dashboard', tasks);

router.get('/logout', (req, res) => {
   
    res.redirect('/');
      
  });

module.exports = router;
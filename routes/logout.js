const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
   
  res.redirect('/');
    
});

/* GET users listing. */
router.post('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
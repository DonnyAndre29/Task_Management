const router = require('express').Router();
const { User } = require('../../models/User');

router.post('/', async (req, res) => {
  try {
    // Find user by username entered
    const userCheck = await User.findOne({ where: {user_name:  req.body.user_name}});
  
    // Failure message on username/password being incorrect
    if (!userCheck) {
      res.status(400).json({ message: 'Your username and/or password are incorrect, please retry' });
      return;
    }

    // Validate entered password matches stored password
    const validPassword = await userCheck.checkPw(req.body.password);
    
    // Failure message on incorrect password entry
    if (!validPassword) {
      res.status(401).json({ message: 'Your password is incorrect, please try again' });
      return;
    }

    // Session variables based on the current logged in user
    req.session.save(() => {
      req.session.user_id = userCheck.id;
      req.session.logged_in = true;
      
      res.json({ user: userCheck, message: `You're logged in`})
    });
    

  } catch (error) {
    res.status(500).json({error: error, message: `I'm sorry but I am unable to continue.`});
    console.log(error)
  }
});


router.post('/logout', (req, res) => {
  if (req.session.logged_in) {

    // Removes all session data on logout
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
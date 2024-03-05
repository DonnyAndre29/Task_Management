// const express = require('express');
// const router = express.Router();

// const userController = require("../controller/user-controller"); // importing the user controller 

// router.post("/sign-up", userController.registerUser);
// router.post("/login", userController.loginUser);
module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    },
      
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/log');
      }
    },
  }


// module.exports = router;

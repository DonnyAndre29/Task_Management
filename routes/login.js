const express = require('express');
const router = express.Router();
const db = require('../db/connect');
/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('Signin');
});

router.post('/login', function(req, res){
    const emailAddress = req.body.email_address;
    const password = req.body.password;

    const sql='SELECT * FROM registration WHERE email_address =? AND password =?';
    db.query(sql, [emailAddress, password], function (err, data, fields) {
        if(err) throw err
        if(data.length>0){
            req.session.loggedinUser= true;
            req.session.emailAddress= emailAddress;
            res.redirect('/dashboard');
        }else{
            res.render('Signin',{alertMsg:"Your Email Address or password is wrong"});
        }
    })

})

module.exports = router;
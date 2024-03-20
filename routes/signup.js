const express = require('express');
const router = express.Router();
const db = require('../db/connect')

// to display registration form 
// router.get('/signup', (req, res) => {
//     res.render('signup.html')
//   })
// router.get('/signup', function(req, res, next) {
//   res.render('Signup');
// });

// to store user input detail on post request
router.post('/signin', function(req, res, next) {
    
    inputData ={
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_address: req.body.email_address,
        // gender: req.body.gender,
        password: req.body.password,
        confirm_password: req.body.confirm_password
    }
// check unique email address
const sql='SELECT * FROM registration WHERE email_address =?';
db.query(sql, [inputData.email_address] ,function (err, data, fields) {
 if(err) throw err
 if(data.length>1){
     var msg = inputData.email_address+ "was already exist";
 }else if(inputData.confirm_password != inputData.password){
    var msg ="Password & Confirm Password is not Matched";
 }else{
     
    // save users data into database
    const sql = 'INSERT INTO registration SET ?';
   db.query(sql, inputData, function (err, data) {
      if (err) throw err;
           });
  var msg ="Your are successfully registered";
 }
 res.render('Signup',{alertMsg:msg});
})
     
});
module.exports = router;
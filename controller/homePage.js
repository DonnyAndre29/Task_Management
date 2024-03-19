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



module.exports = router;
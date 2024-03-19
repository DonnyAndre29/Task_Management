const router = require('express').Router();
const loginRoute = require('./login');
const logoutRoute = require('./logout');
// const postRoute = require('./postRoute');
// const signupRoute = require('./signup');
// const commentRoute = require('./commentRoute')


router.use('/login', loginRoute);
router.use('/logout', logoutRoute);
// router.use('/post', postRoute);
// router.use('/signup', signupRoute);
// router.use('/comment', commentRoute);

module.exports = router;
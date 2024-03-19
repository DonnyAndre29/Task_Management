const router = require('express').Router();
const homeRoute = require('./homeRoute');
// const apiRoutes = require('./api');
// const googleRoute = require('./googleRoutes')
const dashboard = require('./dashboard')


router.use('/', homeRoute);
router.use('/success', dashboard);
// router.use('/signup', googleRoute)

// router.use('/api', apiRoutes);

module.exports = router;
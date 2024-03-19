const router = require('express').Router();
const { response } = require('express');
const { User } = require('../../models/User');

router.post('/', async (req, res) => {
    const findUser = await User.findOne({ where: { user_name: req.body.user_name } });
    if(findUser) {
        res.status(400).json({ message: 'Looks like there is already a user with that username. Click the login button to sign in or create a different username.' });
        return;
    } try {
        const user = await User.create({
            user_name: req.body.user_name,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            res.status(200).json(user);
        });
         
        } catch (error) {
                res.status(500).json(error)
            }
});

module.exports = router;
const express = require('express');
const router = express.Router();

//auth handlers for various strategies
const insta = require('./insta');
const gl = require('./gl');
const local = require('./local');
const fb = require('./fb');
const vk = require('./vk');
const linkid = require('./linkid');
const logout = require('./logout');
const postauth = require('./postauth')
const passport = require('passport');
const userModel = require('models/user');




passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

//auth routes
router.use('/insta', insta);
router.use('/gl', gl);
router.use('/local', local);
router.use('/linkid', linkid)

router.use('/fb', fb);
router.use('/vk', vk);
router.use('/logout', logout);
router.use('/postauth', postauth);


router.get('/', function (req, res) {
	debugger;

	res.send('Auth route')
});

module.exports = router;

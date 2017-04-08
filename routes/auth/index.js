const express = require('express');
const router = express.Router();

//auth handlers for various strategies
const vk = require('./vk');
const passport = require('passport');
const userModel = require('models/user');


passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

//auth routes
router.use('/vk', vk);


router.get('/', function (req, res) {
	console.log('auth here');
	res.send('Auth route')
});

module.exports = router;
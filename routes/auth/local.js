const express = require('express');
const router = express.Router();

const userModel = require('models/user');
const authModel = require('models/auth');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password'
	}, authModel.authenticateLocal()
));


//local auth handler
router.post('/',
		passport.authenticate('local', {
		successRedirect: '/auth/postauth',
		failureRedirect: '/',
		failureFlash: false
	}));

module.exports = router;

const express = require('express');
const router = express.Router();

const userModel = require('models/user');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

passport.use(new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password'
	}, userModel.authenticate()
));


//local auth handler
router.post('/',
		passport.authenticate('local', {
		successRedirect: '/users',
		failureRedirect: '/',
		failureFlash: false
	}));

module.exports = router;

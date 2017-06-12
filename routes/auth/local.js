const express = require('express');
const router = express.Router();

const userModel = require('models/user');
const authModel = require('models/auth');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authmw = require('./authmw');

passport.use(new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password'
	}, authModel.authenticateLocal()
));


//local auth handler
//using custom middleware to avoid 401 error.
router.post('/', (req, res, next) => {
	passport.authenticate('local', authmw(req,res,next))(req, res, next);
})

module.exports = router;

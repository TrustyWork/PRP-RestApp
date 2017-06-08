const express = require('express');
const router = express.Router();

const userModel = require('models/user');
const authModel = require('models/auth');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password'
	}, authModel.authenticateLocal()
));


//local auth handler
//using custom middleware to avoid 401 error.
router.post('/', (req, res, next) => {
	passport.authenticate('local', function (err, user, info) {

		if (err) { return next(err); }

		// auth fail
		if (!user) { return res.send(JSON.stringify({ error: info })) }

		//auth success
		req.logIn(user, function (err) {
			if (err) { return next(err); }
			return res.send(JSON.stringify({ error: null, user: user }))
		});
	})(req, res, next);
})

module.exports = router;

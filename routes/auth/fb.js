const express = require('express');
const router = express.Router();
const passport = require('passport');
const userModel = require('models/user');
const config = require('config');
const FacebookStrategy = require('passport-facebook').Strategy;


passport.use(new FacebookStrategy({
	'clientID': config.get('auth:facebookAuth:clientID'),
	'clientSecret': config.get('auth:facebookAuth:clientSecret'),
	'callbackURL': config.get('rootURL') + ':' + config.get('callbackPort') + config.get('auth:facebookAuth:callbackURL')
},
	function (accessToken, refreshToken, profile, done) {
		profile.username = profile.displayName;
		userModel.findOrCreate(profile, (err, user) => {
			if (err) { return done(err); }
			return done(null, user);
		});
	}
));

router.get('/', passport.authenticate('facebook'));

router.get('/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
	function (req, res) {
		res.redirect('/users');
	});

module.exports = router;
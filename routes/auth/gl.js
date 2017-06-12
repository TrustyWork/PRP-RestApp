const express = require('express');
const router = express.Router();
const passport = require('passport');
const authModel = require('models/auth');
const userModel = require('models/user')
const config = require('config');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const authmw = require('./authmw');

passport.use(new GoogleStrategy({
	'clientID': config.get('auth:googleAuth:clientID'),
	'clientSecret': config.get('auth:googleAuth:clientSecret'),
	'callbackURL': config.get('rootURL') + ':' + config.get('callbackPort') + config.get('auth:googleAuth:callbackURL')
},
	function (accessToken, refreshToken, profile, done) {
		profile.username = profile.displayName;
		profile.token = accessToken;
		authModel.findOrCreate(profile, accessToken, (err, { user }) => { //only user needed here
			if (err) { return done(err, null) }
			return done(null, user);
		});
	}
));

router.get('/', passport.authenticate('google', {
	scope: ['profile', 'email']
}));

router.get('/callback', (req, res, next) => {
	passport.authenticate('google', authmw(req, res, next))(req, res, next);
});

module.exports = router;
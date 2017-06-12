const express = require('express');
const router = express.Router();
const passport = require('passport');
const authModel = require('models/auth');
const userModel = require('models/user');
const config = require('config');
const FacebookStrategy = require('passport-facebook').Strategy;
const authmw = require('./authmw');

passport.use(new FacebookStrategy({
	clientID: config.get('auth:facebookAuth:clientID'),
	clientSecret: config.get('auth:facebookAuth:clientSecret'),
	callbackURL: config.get('rootURL') + ':' + config.get('callbackPort') + config.get('auth:facebookAuth:callbackURL'),
	profileFields: ['id', 'displayName', 'email']
},
	function (accessToken, refreshToken, profile, done) {
		profile.username = profile.displayName;
		profile.token = accessToken;
		authModel.findOrCreate(profile, accessToken, (err, {user}) => { //only user needed here
			if (err) { return done(err, null) }
			return done(null, user);
		});
	}
));

router.get('/', passport.authenticate('facebook', {
	scope: ['email']
}));

router.get('/callback', (req, res, next) => {
	passport.authenticate('facebook', authmw(req, res, next))(req, res, next);
});

module.exports = router;
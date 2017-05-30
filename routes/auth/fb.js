const express = require('express');
const router = express.Router();
const passport = require('passport');
const authModel = require('models/auth');
const userModel = require('models/user');
const config = require('config');
const FacebookStrategy = require('passport-facebook').Strategy;


passport.use(new FacebookStrategy({
	clientID: config.get('auth:facebookAuth:clientID'),
	clientSecret: config.get('auth:facebookAuth:clientSecret'),
	callbackURL: config.get('rootURL') + ':' + config.get('callbackPort') + config.get('auth:facebookAuth:callbackURL'),
	profileFields: ['id', 'displayName', 'email']
},
	function (accessToken, refreshToken, profile, done) {
		profile.username = profile.displayName;
		authModel.findOrCreate(profile, (err, authRecord) => {
			return (
				userModel.findOne({ _id: authRecord.user })
					.then(user => done(null, user))
					.catch(err => done(err, null))
			)
		});
	}
	// function (accessToken, refreshToken, profile, done) {
	// 	profile.username = profile.displayName;
	// 	AuthModel.findOrCreate(profile, (err, user) => {
	// 		if (err) { return done(err); }
	// 		return done(null, user);
	// 	});
	// }
));

router.get('/', passport.authenticate('facebook',{
	scope: ['email']
}));

router.get('/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
	function (req, res) {
		res.redirect('/auth/postauth');
	});

module.exports = router;
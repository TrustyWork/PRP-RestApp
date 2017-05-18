const express = require('express');
const router = express.Router();

const userModel = require('models/user');

const passport = require('passport');
const InstagramStrategy = require('passport-instagram');
const config = require('config');

passport.use(new InstagramStrategy(
	{
		clientID: config.get('auth:insta:clientID'),
		clientSecret: config.get('auth:insta:clientSecret'),
		callbackURL: config.get('rootURL') + ':' + config.get('callbackPort') + config.get('auth:insta:callbackPath')
	},

	function (accessToken, refreshToken, profile, done) {

		userModel.findOrCreate(profile, (err, user) => {
			if (err) { return done(err); }
			return done(null, user);
	});
	}
));

//Instagram auth handler
router.get('/', passport.authenticate('instagram'));

router.get('/callback', passport.authenticate('instagram', { failureRedirect: '/' }),
	function (req, res) {
		res.redirect('/auth/postauth');
	});


module.exports = router;

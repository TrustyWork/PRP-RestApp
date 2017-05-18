const express = require('express');
const router = express.Router();

const userModel = require('models/user');

const passport = require('passport');
const PassportVkStrategy = require('passport-vkontakte').Strategy;
const config = require('config');

passport.use('vkontakte', new PassportVkStrategy(
	{
		clientID: config.get("auth:vk:APP_ID"),
		clientSecret: config.get("auth:vk:clientSecret"),
		callbackURL: config.get("app:url") + ":" + config.get("callbackPort") + "/auth/vk/callback"
	},
	function (accessToken, refreshToken, params, profile, done) {
		process.nextTick(function () {
			userModel.findOrCreate(profile, (err, user) => {
				if (err) {
					return done(err);
				}
				return done(null, user)
			})
		})
	}));


router.get('/',
	passport.authenticate('vkontakte', {scope: ['status', 'email', 'friends', 'notify']})
);

router.get('/callback',
	passport.authenticate('vkontakte', {
		successRedirect: '/users',
		failureRedirect: '/',
		failureFlash: false
	})
);

module.exports = router;
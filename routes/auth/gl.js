const express = require('express');
const router = express.Router();
const passport = require('passport');
const userModel = require('models/user');
const config = require('config');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.use(new GoogleStrategy({
    'clientID': config.get('auth:googleAuth:clientID'),
    'clientSecret': config.get('auth:googleAuth:clientSecret'),
    'callbackURL': config.get('rootURL') + ':' + config.get('callbackPort') + config.get('auth:googleAuth:callbackURL')
    },
    function(accessToken, refreshToken, profile, done) {
        profile.username = profile.displayName;
        userModel.findOrCreate(profile, (err, user) => {
            if (err) { return done(err); }
            return done(null, user);
        });
    }
));

router.get('/', passport.authenticate('google', {
    scope: 'profile'}));

router.get('/callback', passport.authenticate('google', { failureRedirect: '/'}),
    function (req, res) {
        res.redirect('/users');
    });


module.exports = router;
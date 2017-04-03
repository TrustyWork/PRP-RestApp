var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('passport');
var passportAuth = require('../config/passport_config.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('rest_users', {user: req.user, title: 'Вход', logInWarn: req.flash('logInWarn')});
});

router.get('/user_profile', function(req, res, next) {
    res.render('rest_user_profile', {user: req.user, message: req.flash('signUpSuccess')});
});

router.post('/login', passport.authenticate('localLogIn', {
    successRedirect: '/rest_users/user_profile',
    failureRedirect: '/rest_users',
    failureFlash: true
}));

router.get('/signup', function(req, res, next) {
    res.render('signUp', {title: 'Регистрация', signUpWarn: req.flash('signUpWarn')});
});

router.post('/signup', passport.authenticate('localSignUp', {
    successRedirect: '/rest_users/user_profile',
    failureRedirect: '/rest_users/signup',
    failureFlash: true,
}));

router.get('/glAuth', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/glAuth/callback', passport.authenticate('google', {
    successRedirect: '/rest_users/user_profile',
    failureRedirect: '/rest_users/signup',
}));

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/rest_users');
});

module.exports = router;
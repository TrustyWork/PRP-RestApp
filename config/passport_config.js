var passport = require('passport');
var Rest_User = require('../models/Rest_User_Model');
var authConfig = require('./forPassportAuth_config');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    Rest_User.findById(id, function(err, user){
        done(err,user);
    })
});

passport.use('localSignUp', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
    },
    function(req, username, password, done){
        Rest_User.findOne({'AuthField.Local.username': username}, function(err, user){
            if(err){
                return done(err);
            }
            if(user){
                return done(null, false, req.flash('signUpWarn', 'This username already exists'));
            }

            var user = new Rest_User();
            if(!user.Name) user.Name = username;
            if(!user.AuthField) user.AuthField =  '';
            user.AuthField.Local.username = username;
            user.AuthField.Local.password =  user.generateHash(password);
            user.save(function(err){
                if(err){
                    throw err;
                }
                return done(null, user, req.flash('signUpSuccess', 'Регистрация успешна'));
            })

        })
    })

);

passport.use('localLogIn', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done){
        Rest_User.findOne({'AuthField.Local.username': username}, function(err, user){
            if(err) {
                return done(err);
            }
            if(!user) {
                return done(null, false, req.flash('logInWarn', 'User not found. Try again'));
            }
            if(!user.validPassword(password)){
                return done(null, false, req.flash('logInWarn', 'Wrong password. Try again'));
            }
            return done(null, user);
        });
    }
));

passport.use(new GoogleStrategy({
    'clientID': authConfig.googleAuth.clientID,
    'clientSecret': authConfig.googleAuth.clientSecret,
    'callbackURL': authConfig.googleAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        Rest_User.findOne({'AuthField.Gl.id': profile.id}, function(err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, user);
            }
            var user = new Rest_User();
            user.Name = profile.displayName;
            user.AuthField =  '';
            user.AuthField.Gl.token = accessToken;
            user.AuthField.Gl.id =  profile.id;
            user.Contacts = profile.emails[0].value;
            if(profile._json.birthday) user.Birthday = profile._json.birthday;
            user.Gender = profile.gender;
            user.save(function(err){
                if(err) {
                    throw err;
                }
                return done(null, user)
            });
        })
    }
));
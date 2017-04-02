var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Sessions support
var session = require('express-session');
var Mongostore = require('connect-mongo')(session);

//models import
var userModel =  require('models/user');

var config = require('config');


//Mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(config.get('db:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    console.error('connection error:', err.message);
});

db.once('open', function () {
    console.info('Connected to DB!');
});

//passportjs
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  }, userModel.authenticate()
));


//Routes
var index = require('routes/index');
var users = require('routes/users');
var api = require('routes/api');
//var auth = require('routes/auth');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.get('SECRET')));
app.use(session({
  secret: config.get('session:secret'),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true },
  store: new Mongostore({ url: config.get('db:uri')})
}))

// Passport init
app.use(passport.initialize());
app.use(passport.session());


app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

//open routes
app.use('/', index);
app.use('/api', api);

//auth
app.use('/auth',
  passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/',
    failureFlash: false
  }));


// check auth middleware
var checkAuth = function (req, res, next) {
    if (req.user)
    { next() }
    else
    { res.redirect('/') }
}

// restricted access
app.use('/users', checkAuth, users);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

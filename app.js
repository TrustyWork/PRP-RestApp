const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('session');

const sessionMW = require('storage').sessionMW;

const config = require('config');


const passport = require('passport');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /puuserModel.register(new userModel({username: profile.username})}blic
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.get('SECRET')));

app.use(sessionMW);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(require('node-sass-middleware')({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: false,
	sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

//delayed routes init.
app.once('restapp_wssready', () => {
	//open routes
	app.use('/', require('routes/index'));
	app.use('/api', require('routes/api'));
	app.use('/auth', require('routes/auth'));


	// check auth middleware
	const checkAuth = function (req, res, next) {
		if (req.user) {
			next()
		}
		else {
			res.redirect('/')
		}
	}

	// restricted access
	app.use('/users', checkAuth, require('routes/users'));


	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
		let err = new Error('Not Found');
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

})

module.exports = app;
const session = require('express-session');
const Mongostore = require('connect-mongo')(session);
const config = require('config');

const sessionMW = session({
	secret: config.get('session:secret'),
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false, httpOnly: true },
	store: new Mongostore({ url: config.get('db:uri') })
})

exports.setupHTTPSessions = function (app) {

	app.use(sessionMW);
}

exports.setupWSSession = function (ws) {

	ws.use((socket, next) => {
		sessionMW(socket.handshake, {}, next); //(socket.request, socket.request.res, next);
	});

}
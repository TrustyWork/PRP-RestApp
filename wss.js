const app = require('app');
const sessionMW = require('storage').sessionMW;

module.exports = function (io) {

	module.exports = io;

	app.emit('restapp_wssready');

	io.use((socket, next) => {
		sessionMW(socket.handshake, {}, next);
	});

	// io routes
	require('routes_io/heartbeat');
	require('routes_io/rooms');
}
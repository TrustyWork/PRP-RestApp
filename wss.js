const sessionMW = require('storage').sessionMW;

module.exports = function (io) {

	module.exports = io;

	io.use((socket, next) => {
		sessionMW(socket.handshake, {}, next);
	});

	// io routes
	require('routes_io/heartbeat');
}
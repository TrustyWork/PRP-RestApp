const app = require('http_server');
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
	require('routes_io/cpuload');
	require('routes_io/authevents');
	require('routes_io/api_user');
	//io custom methods
	io.sendToUid = function(uid,data) {
		if ( /^uid_.+/.test(uid) )
		io.to(uid).emit('restapp_roomMessage',data);
	}

}
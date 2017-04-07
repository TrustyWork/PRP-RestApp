const session = require('session');

module.exports = function (io) {

	module.exports = io;

// setup sessions
	session.setupIO(io)

// io routes
	require('routes_io/heartbeat');


}
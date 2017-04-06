const session = require('session');

module.exports = function (websocketServer) {


	module.exports = websocketServer;

	session.setupWSSession(websocketServer)

	require('./heartbeat');
}
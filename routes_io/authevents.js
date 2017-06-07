const io = require('wss');
const app = require('app');

io.on('connection', function (socket) {

	app.on('user_logout', (data) => { socket.emit('user_logout', data) });
	app.on('user_auth_ok', (data) => {
		socket.emit('user_auth_ok', data)
	});

});

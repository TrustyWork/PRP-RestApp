const io = require('wss');
const app = require('app');

io.on('connection', function (socket) {

	socket.on('/api/user/', (payload) => {

		switch (payload.method) {

			case 'POST':
				console.log('trying to auth with:', payload.authData);
				setTimeout(() => { socket.emit('/api/user', { result: true }) }, 5000)
				break;
			default:

		}

	})


	app.on('user_logout', (data) => { socket.emit('user_logout', data) });
	app.on('user_auth_ok', (data) => {
		socket.emit('user_auth_ok', data)
	});

});

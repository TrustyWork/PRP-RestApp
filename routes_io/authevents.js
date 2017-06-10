const io = require('wss');
const app = require('app');




io.on('connection', function (socket) {

	const handleUserLogin = (data) => {
		console.log('handlelogin:', data);
		if (data.sessID == socket.handshake.session.id) {
			console.log('it"s our login event. reporting to APP',data.sessID,socket.handshake.session.id);
			//
		} else {
			console.log('ignoring...')
		}
	}
	console.log('connect fired');
	//app.on('user_logout', (data) => { socket.emit('user_logout', data) });
	app.addListener('user_auth_ok', handleUserLogin);

	socket.on('/api/user/', (payload) => {
		switch (payload.method) {
			case 'POST':
				console.log('trying to auth with:', payload.authData);
				setTimeout(() => { socket.emit('/api/user', { result: true }) }, 5000)
				break;
			default:
		}
	})

	// cleanup....
	socket.on('disconnect', () => { app.removeListener('user_auth_ok', handleUserLogin) })

});

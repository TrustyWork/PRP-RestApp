const io = require('ws_server');
const app = require('http_server');

// let sessions = {}

// const emitBySession = (sid, path, data) => {
// 	return new Promise((res, rej) => {
// 		if (!sessions[sid]) {
// 			return rej();
// 		}

// 		for (socket of sessions[sid]) {
// 			socket.emit(path, data);
// 		}

// 		res();
// 	})
// }

// app.addListener('user_auth_ok', (data) => {
// 	emitBySession(data.sesID, '/auth/login', {});
// });

// io.on('connection', function (socket) {

// 	if (socket.handshake.session && socket.handshake.session.id) {
// 		let sid = socket.handshake.session.id;
// 		if (!sessions[sid]) {
// 			sessions[sid] = [];
// 		}

// 		sessions[sid].push(socket);
// 	}

	// socket.on('/api/user/', (payload) => {
	// 	switch (payload.method) {
	// 		case 'POST':
	// 			console.log('trying to auth with:', payload.authData);
	// 			setTimeout(() => { socket.emit('/api/user', { result: true }) }, 5000)
	// 			break;
	// 		default:
	// 	}
	// })

	// cleanup....
	// socket.on('disconnect', () => { app.removeListener('user_auth_ok', handleUserLogin) })

// });

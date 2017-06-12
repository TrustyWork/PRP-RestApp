const io = require('ws_server');
const userModel = require('models/user');

//Auto join

io.on('connection', (socket) => {
	if (!socket.handshake.session) { return }

	if ( socket.handshake.session.passport && socket.handshake.session.passport.user) {
		let userRoom = `uid_${socket.handshake.session.passport.user}`;
		socket.join(userRoom);
	}

	let sessionRoom = `sid_${socket.handshake.session.id}`;
	socket.join(sessionRoom);
})
const io = require('wss');
const userModel = require('models/user');

//Auto join

io.on('connection', (socket) => {
	if (socket.handshake.session.passport && socket.handshake.session.passport.user) {
		let room = `uid_${socket.handshake.session.passport.user}`;
		socket.join(room);
		console.log('joining room:', room);
	}

})
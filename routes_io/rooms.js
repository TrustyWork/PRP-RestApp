const io = require('wss');
const userModel = require('models/user');

//Auto join / leave

io.on('connection', (socket) => {
	if (socket.handshake.session.passport.user) {
		socket.join(`uid_${socket.handshake.session.passport.user}`);
		console.log('joining:',`uid_${socket.handshake.session.passport.user}`)
	}

})
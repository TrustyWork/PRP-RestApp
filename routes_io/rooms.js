const io = require('wss');
const userModel = require('models/user');

//Auto join / leave

io.on('connection', (socket) => {
	if (socket.handshake.session.passport) {
		userModel.findByUsername(socket.handshake.session.passport.user, (err, user) => {
			if (err) { return err }
			if (user) {
				socket.join(user._id.toString());
			}
		})
	}

})
const io = require('ws_server');
const userModel = require('models/user')
//
// /api/user/( :id || me )
// me - get my user object from model;

const path = '/api/user/';

io.on('connection', (socket) => {
	socket.on(path, (data) => {
		if (!data || !data.param) { return }

		let user = (data.param == 'me') ?
			socket.handshake.session
			&& socket.handshake.session.passport
			&& socket.handshake.session.passport.user
			:
			data.param;

		if (user) {
			userModel.findOne({ _id: user })
				.then((user) => { socket.emit(path, { request: data, data: { user: user }, error: null }) })
				.catch((err) => { socket.emit(path, { request: data, data: null, error: err }) })
		} else {
			socket.emit(path, { request: data, data: { user: null }, error: null })
		}
	})
})
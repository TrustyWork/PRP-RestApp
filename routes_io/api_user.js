const io = require('ws_server');
const users = require('libs/user');
//
// /api/user/( :id || me )
// me - get my user object from model;

const getUserData = '/api/user/';
const checkUserData = '/api/user/check';

io.on('connection', (socket) => {
	socket.on(getUserData, (data) => {
		if (!data || !data.param) { return }

		let user = (data.param == 'me') ?
			socket.handshake.session
			&& socket.handshake.session.passport
			&& socket.handshake.session.passport.user
			:
			data.param;

		if (user) {
			users[user] ?
				socket.emit(getUserData, { request: data, data: { user: users[user] }, error: null })
				:
				socket.emit(getUserData, { request: data, data: { user: null }, error: null })
		}
	})

	socket.on(checkUserData, (data) => {

		if (!data) { return }
		console.log(checkUserData);
		let checkResult = {};
		if (data.username) {
			for (let userID in users) {
				if (users[userID].username == data.username) {
					checkResult.username = "username already taken!";
					break;
				}
			}
		}
		if (data.email) {
			for (userID in users) {
				if (users[userID].email == data.email) {
					checkResult.email = "email already exist!";
					break;
				}
			}
		}
		socket.emit(checkUserData, { error: checkResult })
	})
})
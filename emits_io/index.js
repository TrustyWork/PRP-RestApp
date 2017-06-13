const io = require('ws_server');

let emits = [];


module.exports.sendToAll = (path, data) => {

	return new Promise((res, rej) => {

		io.emit(path, data);
//		console.log('sockets:',io.sockets);
		res(path, data);

	})
}

module.exports.sendToUid = (path, data, uid) => {

	return new Promise((res, rej) => {

		let room = 'uid_' + uid;

		io.to(room).emit(path, data);
		res(path, data, uid);

	})
}

module.exports.sendToSid = (path, data, sid) => {

	return new Promise((res, rej) => {

		let room = 'sid_' + sid;
		io.to(room).emit(path, data);

		res(path, data, sid);

	})
}

for (let emit of emits)
{
	require ('./' + emit);
}
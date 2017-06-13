const io = require('ws_server');
const emits_io = require('emits_io');

io.on('connection', function (socket) {

	//hertbeat
	setInterval(() => {
		//emits_io.sendToAll('tic-tac', Math.random());
		socket.emit('tic-tac', Math.random())

	}, 10000);

	//ping responder
	socket.on('p-i-n-g', (msg) => {
		socket.emit('p-o-n-g', {})  // :-)

	});

});
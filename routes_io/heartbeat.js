const io = require('wss');

io.on('connection', function (socket) {

	//hertbeat
	setInterval(() => {
		socket.emit('tic-tac', 'I\'m alive')
	}, 10000);

	//ping responder
	socket.on('p-i-n-g', (msg) => {
		socket.emit('p-o-n-g', {})  // :-)

	});

});
const io = require('wss');

io.on('connection', function (socket) {

	//hertbeat
	setInterval(() => {
		socket.emit('tic-tac', 'I\'m alive')
	}, 10000);

	//ping responder
	socket.on('p-i-n-g', (msg) => {
		console.log('p-i-n-g, current rooms:',socket.rooms);
		socket.emit('p-o-n-g', {})  // :-)

	});

});
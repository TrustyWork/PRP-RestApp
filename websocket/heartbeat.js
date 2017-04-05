const websocketServer = require('./index');

websocketServer.on('connection', function (client) {
	console.log('connected!');
	//hertbeat
	setInterval(() => {
		client.emit('tic-tac', 'I\'m alive')
	}, 10000);

	//ping responder

	// client.on('p-i-n-g', (msg) => {
	// 	console.log('p-i-n-g');
	// 	client.emit('p-o-n-g', {})  // :-)
	//
	// });

});

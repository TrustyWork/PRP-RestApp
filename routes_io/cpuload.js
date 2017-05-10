const io = require('wss');
const loadAVG = require('os').loadavg;

io.on('connection', function (socket) {
	setInterval(() => {
		socket.emit('loadavg', loadAVG())
	}, 1000);
});
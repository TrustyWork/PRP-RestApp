const io = require('ws_server');
const loadAVG = require('os').loadavg;
const freemem = require('os').freemem;
io.on('connection', function (socket) {
	setInterval(() => {
		socket.emit('loadavg', loadAVG())
		socket.emit('freemem', freemem())
	}, 1000);
});
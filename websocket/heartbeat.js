var websocketServer = require('./index');

websocketServer.on('connection', function (socket) {

    //hertbeat
    setInterval(() => { socket.emit('tic-tac', 'I\'m alive') }, 10000)

    //ping responder
    socket.on('ping', (msg) => {
        socket.emit('pong', msg.split('').reverse.join(''))  // :-)

    });

});

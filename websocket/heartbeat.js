var socket = require('./index');

socket.on('connection', function (client) {

    //hertbeat
    setInterval(() => { client.emit('tic-tac', 'I\'m alive') }, 10000)

    //ping responder
    client.on('ping', (msg) => {
        client.emit('pong', 'msg'.split('').reverse.join(''))  // :-)

    });

});

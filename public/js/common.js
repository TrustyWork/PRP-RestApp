var socket = io();
    socket.on('connect', ()=>{console.log('Websocket connected!',socket.id)});
    socket.on('tic-tac', (msg) =>  {console.log(msg)} );

var socket= io.connect('http://localhost:4000');

    socket.on('connect', ()=>{
        console.log('Websocket connected!');
    });

    socket.on('tic-tac', (msg) =>  {console.log(msg)} );
    
    socket.on('p-o-n-g', (msg) =>  {console.log('pong',msg)} );
    
    //socket.emit('ping');

    setInterval (()=>{ 
        console.log('pinging');
        socket.emit('p-i-n-g',{})} ,2000)

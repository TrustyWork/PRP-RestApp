let socket = io.connect();

socket.on('connect', () => {
	console.log('Websocket connected!');
});

socket.on('tic-tac', (msg) => {
	console.log(msg)
});

socket.on('p-o-n-g', (msg) => {
	console.log('pong', msg)
});

socket.on('new_user',(user)=>{
	console.log('new user!',user);
})

socket.on('restapp_roomMessage',(msg)=>{
	console.log(msg);
})

//tests
socket.emit('/api/user/', { param: 'me'});
socket.emit('/api/user/', { param: '666'});
socket.emit('/api/user/', { param: '5939550f4e64fd034bccfd51'});
socket.on('/api/user/', (res) => { console.log('/api/user/ response:', res) })

setInterval(() => {
	console.log('pinging');
	socket.emit('p-i-n-g', {})
}, 10000);

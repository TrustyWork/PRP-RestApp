import io from 'socket.io-client';

const socket = io();

socket.on('tic-tac', (data)=>{console.info('server alive',data)});


export default socket;
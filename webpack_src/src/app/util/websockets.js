import io from 'socket.io-client';

const socket = io();

socket.on('tic-tac', ()=>{console.info('server alive')});


export default socket;
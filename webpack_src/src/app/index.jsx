
import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from 'app/containers/MainPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'font-awesome/css/font-awesome.css';
import io from 'socket.io-client';

//Touch support for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const socket = io(window.location.host);

socket.on('connect', ()=>{
	console.log('connected',socket.id)
	socket.on('tic-tac', ()=>{console.log('Host is alive...')})
	socket.on('disconnect',()=>{console.log('Host connection lost')})
});

const socket2 = io(window.location.host);

socket2.on('connect', ()=>{
	console.log('connected',socket2.id)
	socket2.on('tic-tac', ()=>{console.log('Host is alive...')})
	socket2.on('disconnect',()=>{console.log('Host connection lost')})
});


ReactDOM.render (
	<MuiThemeProvider>
		<MainPage />
	</MuiThemeProvider>
	, document.querySelector('#rm-root')
);
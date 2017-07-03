
import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from 'app/containers/MainPage';
import socket from 'app/ws_client';
import { BrowserRouter } from 'react-router-dom'

import 'font-awesome/css/font-awesome.css';
import './main.scss';
import 'normalize.css/normalize.css'

import { Provider } from 'react-redux';
import store from './store';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

socket.on('connect', () => { store.dispatch({ type: 'APP_ONLINE', data: '' }) });
socket.on('disconnect', () => { store.dispatch({ type: 'APP_OFFLINE', data: '' }) });

//socket.on ('/api/auth/success', (user) => { console.log('user auth success',user) });

//setInterval(() => { store.dispatch({ type: 'ADD_SIDEMENU_ENTRY', data: '' }) }, 5000);
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//disable to save traffic
//setInterval(() => { store.dispatch({ type: 'REPLACE_PIC_BY_IDX', payload: { idx: getRandomInt(0, 5), url:'http://lorempixel.com/350/350/food/' + getRandomInt(1, 10)+'/'   } }) }, 5000);



ReactDOM.render (
	<BrowserRouter>
	<Provider store={store}>
		<MainPage />
	</Provider>
	</BrowserRouter>
	, document.querySelector('#rm-root')
);
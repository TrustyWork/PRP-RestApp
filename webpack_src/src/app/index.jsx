
import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from 'app/containers/MainPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'font-awesome/css/font-awesome.css';
import './main.scss';

import { Provider } from 'react-redux';
import store from './store';

//Touch support for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// console.log(store.getState());

//setInterval(() => { store.dispatch({ type: 'ADD_SIDEMENU_ENTRY', data: '' }) }, 5000);

ReactDOM.render (
	<Provider store={store}>
	<MuiThemeProvider>
		<MainPage />
	</MuiThemeProvider>
	</Provider>

	, document.querySelector('#rm-root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from 'app/containers/MainPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'font-awesome/css/font-awesome.css';
import './main.scss'

//Touch support for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render (
	<MuiThemeProvider>
		<MainPage />
	</MuiThemeProvider>
	, document.querySelector('#rm-root')
);
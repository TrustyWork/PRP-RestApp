
import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from 'app/containers/MainPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render (
	<MuiThemeProvider>
		<MainPage />
	</MuiThemeProvider>
	, document.querySelector('#rm-root')
);
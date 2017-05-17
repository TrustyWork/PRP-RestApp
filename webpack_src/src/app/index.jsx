
import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from 'app/containers/MainPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//Touch support for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render (
	<MuiThemeProvider>
		<MainPage />
	</MuiThemeProvider>
	, document.querySelector('#rm-root')
);
import React from 'react';

import AppBar from 'material-ui/AppBar'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Header = () => (
	<MuiThemeProvider>
		<AppBar
			title="Title"
			iconClassNameRight="muidocs-icon-navigation-expand-more"
		/>
	</MuiThemeProvider>
)

export default Header;
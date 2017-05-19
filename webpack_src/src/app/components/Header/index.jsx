import React from 'react';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import AuthForm from 'app/components/AuthForm';

import style from './style.scss'

const Header = ({ isAuthenticated, isOnline, ...props }) => {
	console.log('props in Header', props);
	return (
		<AppBar
			title="RestApp"
			iconElementRight={
				isAuthenticated ?
					<FlatButton label="LogOut" />
					:
					<AuthForm {...props} />
			}
		>
		</AppBar>
	)
}

export default Header;

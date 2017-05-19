import React from 'react';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import AuthForm from 'app/components/AuthForm';
import Snackbar from 'material-ui/Snackbar';

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
			<Snackbar
				open={!isOnline}
				bodyStyle ={{
					backgroundColor: "#FF0000"
				}}
				style={{
					backgroundColor: "#FF0000",
					opacity: '0.7',
					bottom: 'auto',
					top: 0,
					transform: !isOnline ? 'translate(-50%, 0)' : 'translate(-50%, -50px)',
				}}
				message="Warning! You are offline"
				autoHideDuration={4000}
				onRequestClose={() => { }}
			/>
		</AppBar>
	)
}

export default Header;

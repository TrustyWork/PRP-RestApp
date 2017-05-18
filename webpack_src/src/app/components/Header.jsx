import React from 'react';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'
import AuthForm from 'app/components/AuthForm';


// class Header extends React.Component {
// handleShow={props.handleAuthFormShow}
// handleHide={props.handleAuthFormHide}
// isShown={props.isAuthFormShown}
// 	render() {
const Header = ({ isAuthenticated, ...props }) => {
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
		/>
	)
}
//}

export default Header;
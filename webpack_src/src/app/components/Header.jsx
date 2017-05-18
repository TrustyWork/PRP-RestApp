import React from 'react';

import AppBar from 'material-ui/AppBar'
import AuthForm from 'app/components/AuthForm'


class Header extends React.Component {

	// constructor(props) {
	// 	super(props);
	// 	this.state = {

	// 		//user info
	// 		isAuthenticated: false,
	// 		userInfo: {},

	// 		//app state
	// 		isAuthFormShown: false,
	// 	}

	// }

	// //Handlers for authForm
	// handleAuthFormShow = () => {
	// 	this.setState({ isAuthFormShown: true })
	// }

	// handleAuthFormHide = () => {
	// 	this.setState({ isAuthFormShown: false })
	// }

	render() {
		return (
			<AppBar
				title="RestApp"
				iconElementRight={
					<AuthForm
						handleShow={this.props.handleAuthFormShow}
						handleHide={this.props.handleAuthFormHide}
						isShown={this.props.isAuthFormShown}
					/>}
			/>
		)
	}
}

export default Header;
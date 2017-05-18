import React from 'react';

import AppBar from 'material-ui/AppBar'
import AuthForm from 'app/components/AuthForm'


class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

			//user info
			isAuthenticated: false,
			userInfo: {},

			//app state
			isAuthFormShown: false,
		}

		//	handleAuthFormShow = handleAuthFormShow.bind(this);
		//	handleAuthFormHide = handleAuthFormHide.bind(this);
	}

	//Handler for authForm
	handleAuthFormShow = () => {

		this.setState({ isAuthFormShown: true })
	}
	handleAuthFormHide = () => {
		this.setState({ isAuthFormShown: false })
	}
	render() {
		return (
			<AppBar
				title="RestApp"
				iconElementRight={<AuthForm
					handleShow={this.handleAuthFormShow}
					handleHide={this.handleAuthFormHide}
					isShown={this.state.isAuthFormShown}
				/>}
			/>
		)
	}
}

export default Header;
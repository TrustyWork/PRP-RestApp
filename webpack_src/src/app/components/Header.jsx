import React from 'react';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'
import AuthForm from 'app/components/AuthForm';


class Header extends React.Component {

	render() {
		return (
			<AppBar
				title="RestApp"
				iconElementRight={
					this.props.isAuthenticated ?
						(
							<FlatButton label="LogOut" />
						)
						:
						(<AuthForm
							handleShow={this.props.handleAuthFormShow}
							handleHide={this.props.handleAuthFormHide}
							isShown={this.props.isAuthFormShown}
						/>)
				}
			/>
		)
	}
}

export default Header;
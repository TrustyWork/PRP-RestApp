import React from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import * as authActions from 'app/actions/auth';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import AuthForm from 'app/components/AuthForm';

import style from './style.scss'
// { isAuthenticated,  handleLogout, ...props }
const Header = (props) => {
	return (
		<AppBar
			title={props.user.username ? `RestApp: Welcome, ${props.user.username}` : 'RestApp'}
			iconElementRight={
				props.user.username ?
					<FlatButton
						label="LogOut"
						onTouchTap={props.handleLogout}
					/>
					:
					<AuthForm />
			}
		>
		</AppBar>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleLogout: () => { dispatch(authActions.authFullLogout()) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

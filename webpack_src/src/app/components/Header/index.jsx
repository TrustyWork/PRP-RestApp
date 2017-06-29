import React from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import * as authActions from 'app/actions/auth';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import AuthForm from 'app/components/AuthForm';

import style from './style.scss'

const Header = (props) => {
	return (
		<AppBar
			title={props.user ? `RestApp: Welcome, ${props.users[props.user].username}` : 'RestApp'}
			iconElementRight={
				props.user ?
					<FlatButton
						label="LogOut"
						onTouchTap={props.handleLogout}
						disabled={!props.isOnline}
					/>
					:
					<AuthForm {...props}/>
			}
		>
		</AppBar>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.common.user,
		isOnline: state.common.isOnline,
		users: state.users
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleLogout: () => { dispatch(authActions.authFullLogout()) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

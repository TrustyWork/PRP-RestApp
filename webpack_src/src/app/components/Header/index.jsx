import React from 'react';
import { connect } from 'react-redux';
import * as authActions from 'app/actions/auth';

import AuthForm from 'app/components/AuthForm';

import style from './style.scss'

const Header = (props) => {
	return (
		<div className={style.appbar}>
			<span className={style.pullleft}>
				{props.user ? `RestApp: Welcome, ${props.users[props.user].username}` : 'RestApp'}
			</span>
			{
				props.user ?
					<button
						className={style.pullright}
						onClick={props.handleLogout}
					>
						Logout...
					</button>
					:
					<button
						className={style.pullright}
						onClick={props.handleLogin}
					>
						Login...
					</button>
			}

			<AuthForm  {...props} />

		</div>
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
		handleLogout: () => { dispatch(authActions.authFullLogout()) },
		handleLogin: () => { dispatch(authActions.authFormShow()) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

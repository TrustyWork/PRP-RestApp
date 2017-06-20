import socket from 'app/util/websockets';
import React from 'react';
import Dialog from 'material-ui/Dialog';

import MenuItem from 'material-ui/MenuItem';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import style from './style.scss';

import * as authActions from 'app/actions/auth';

import AuthForm from './authform';




const doExternalAuth = (provider, dispatch) => {
	const mapperURL = {
		fb: '/auth/fb',
		gl: '/auth/gl',
		insta: '/auth/insta',
		vk: '/auth/vk',
		in: '/auth/linkid'
	}

	const w = 1000;
	const h = 600;
	const left = (screen.width / 2) - (w / 2);
	const top = (screen.height / 2) - (h / 2);
	let authWin = window.open(mapperURL[provider], 'RESTAPP Auth window',
		`width=${w},height=${h},top=${top},left=${left},menubar=no,location=no,resizable=no,scrollbars=yes,status=no`)

	let authTimeoutTimer = setTimeout(() => { authWin.close(); }, 90000);

	// rearm event handler
	let listener = (user) => {
		clearTimeout(authTimeoutTimer);
		if (!authWin.closed) { authWin.close(); }
		dispatch(authActions.authSuccess(user.user));
	}
	socket.off('/api/auth/success', listener);
	socket.once('/api/auth/success', listener);

}

const AuthDialog = (props) => {
	return (
		<div>
			<MenuItem primaryText="Login..." onTouchTap={props.actions.authFormShow} />
			<Dialog
				title="Connect with social network or with local account"
				titleClassName={style.title}
				modal={false}
				open={props.isShown}
				onRequestClose={props.actions.authFormHide}
				bodyClassName={style.body}
			>
				<AuthForm handleExternalAuth={doExternalAuth} />
			</Dialog>
		</div>
	)
}

const mapStateToProps = (state) => {
	return state.dialogs.authForm
}

const mapDispatchToProps = (dispatch) => {
	return { actions: bindActionCreators(authActions, dispatch) }
}



export default connect(mapStateToProps, mapDispatchToProps)(AuthDialog);
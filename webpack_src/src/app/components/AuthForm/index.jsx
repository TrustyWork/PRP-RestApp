import socket from 'app/util/websockets';
import React from 'react';
import Dialog from 'material-ui/Dialog';

import MenuItem from 'material-ui/MenuItem';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import style from './style.scss';

import * as authActions from 'app/actions/auth';

import Form from './form';


//submit handler
const doLocalAuth = (values,dispatch,props) => {

	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');

	const requestOptions = {
		credentials: 'include',
		method: 'POST',
		headers: myHeaders,
		body: JSON.stringify(values)
	}

	return fetch('/auth/local', requestOptions)
	.then(res.json)
	.then(json => {});
}

// const processLogin = () => {
// 		//hide loginForm
// 		this.setState({ isAuthFormShown: false })
// 		//fetch & update actual state
// 		this.checkAuth()
// 			.then((userinfo) => {
// 				userinfo ?
// 					this.setState({
// 						userInfo: userinfo,
// 						isAuthenticated: true
// 					})
// 					:
// 					this.setState({
// 						userInfo: {},
// 						isAuthenticated: false
// 					})
// 			});
// 	}


const doExternalAuth = (provider,dispatch) => {
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
		authWin.onbeforeunload = () => {console.log('onbeforeunload')};
		authWin.onunload = () => {console.log('onunload')};
		authWin.onclose = () => {console.log('onclose')};


		let authTimeoutTimer = setTimeout(() => { authWin.close(); }, 90000);

		// rearm event handler
		socket.off('user_auth_ok');
		socket.once('user_auth_ok', () => {
			clearTimeout(authTimeoutTimer);
			if (!authWin.closed) { authWin.close(); }
			dispatch(authActions.authFormHide());
		})

	}

const AuthForm = (props) => {
	return (
		<div>
			<MenuItem primaryText="Login..." onTouchTap={props.actions.authFormShow}/>
			<Dialog
				title="Create new account"
				titleClassName={style.title}
				modal={false}
				open={props.isShown}
				onRequestClose={props.actions.authFormHide}
				bodyClassName={style.body}
			>
			<Form handleExternalAuth={doExternalAuth} onSubmit={doLocalAuth}/>
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



export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
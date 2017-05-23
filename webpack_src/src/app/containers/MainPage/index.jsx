import React from 'react';

import Header from 'app/components/Header';
import SideMenu from 'app/components/SideMenu';
import OfflineNotifier from 'app/components/OfflineNotifier';
import ImgList from 'app/components/ImgList';
import socket from 'app/util/websockets'
import style from './style.scss';


class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

			//user info
			isAuthenticated: false,
			userInfo: {},

			//app state
			isAuthFormShown: false,
			isOnline: true,
			tilesData: [
				{
					img: 'http://placehold.it/350x350',
					title: 'Breakfast',
					author: 'jill111',
				},
				{
					img: 'http://placehold.it/350x350',
					title: 'Tasty burger',
					author: 'pashminu',
				},
				{
					img: 'http://placehold.it/350x350',
					title: 'Camera',
					author: 'Danson67',
				},
				{
					img: 'http://placehold.it/350x350',
					title: 'Morning',
					author: 'fancycrave1',
				},
				{
					img: 'http://placehold.it/350x350',
					title: 'Hats',
					author: 'Hans',
				}
			],
			sideMenu: [
				{
					item: 'Popular',
					icon: 'fa fa-fire'

				},
				{
					item: 'Favorites',
					icon: 'fa fa-heart'

				},
				{
					item: 'Promotional',
					icon: 'fa fa-birthday-cake'

				},
				{
					item: 'Hot',
					icon: 'fa fa-exclamation-circle'

				},
			]
		}
		socket.on('connect', this.handleOnline);
		socket.on('disconnect', this.handleOffline);
	}

	handleOnline = () => { this.setState({ isOnline: true }) };
	handleOffline = () => { this.setState({ isOnline: false }) };

	handleLogout = () => {
		fetch('/auth/logout', { credentials: 'include' })
			.then((response) => {
				if (response.ok) {
					this.setState({ isAuthenticated: false })
				}
			});
	}

	checkAuth = () =>
		fetch('/api/whoami', { credentials: 'include' })
			.then((response) => response.json())

	processLogin = () => {
		//hide loginForm
		this.setState({ isAuthFormShown: false })
		//fetch & update actual state
		this.checkAuth()
			.then((userinfo) => {
				userinfo ?
					this.setState({
						userInfo: userinfo,
						isAuthenticated: true
					})
					:
					this.setState({
						userInfo: {},
						isAuthenticated: false
					})
			});
	}

	//Handlers for authForm
	handleAuthFormShow = () => {
		this.setState({ isAuthFormShown: true })
	}

	handleAuthFormHide = () => {
		this.setState({ isAuthFormShown: false })
	}

	handleAuthFormDoAuth = (provider) => {

		const mapperURL = {
			fb: '/auth/fb',
			gl: '/auth/gl',
			insta: '/auth/insta',
			vk: '/auth/vk',
			in: '/auth/linkid'
		}

		let w = 1000;
		let h = 600;
		let left = (screen.width / 2) - (w / 2);
		let top = (screen.height / 2) - (h / 2);
		let authWin = window.open(mapperURL[provider], 'RESTAPP Auth window',
			`width=${w},height=${h},top=${top},left=${left},menubar=no,location=no,resizable=no,scrollbars=yes,status=no`)

		let authTimeoutTimer = setTimeout(() => { authWin.close(); }, 90000);

		// rearm event handler
		socket.off('user_auth_ok');
		socket.once('user_auth_ok', () => {
			clearTimeout(authTimeoutTimer);
			if (!authWin.closed) { authWin.close(); }
			this.processLogin();
		})

	}

	componentDidMount() {
		this.checkAuth()
			.then((userinfo) => {
				userinfo ?
					this.setState({
						userInfo: userinfo,
						isAuthenticated: true
					})
					:
					this.setState({
						userInfo: {},
						isAuthenticated: false,
					})
			});
	}

	render() {
		return (
			<div className={style.wrapper}>
				<div className={style.header}>
					<Header
						handleAuthFormShow={this.handleAuthFormShow}
						handleAuthFormHide={this.handleAuthFormHide}
						isAuthFormShown={this.state.isAuthFormShown}
						isAuthenticated={this.state.isAuthenticated}
						userInfo={this.state.userInfo}
						handleAuthFormDoAuth={this.handleAuthFormDoAuth}
						isOnline={this.state.isOnline}
						handleLogout={this.handleLogout}
					/>
				</div>

				<div className={style.wrapper2}>
					<div className={style.sidemenu}>
						<SideMenu
							sideMenu={this.state.sideMenu}
						/>
					</div>
					<div className={style.content}>

						<ImgList
							tilesData={this.state.tilesData}
						/>
					</div>
				</div>
				<OfflineNotifier isOnline={this.state.isOnline} />
			</div>
		)
	}
}

export default MainPage;

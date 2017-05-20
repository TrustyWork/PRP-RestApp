import React from 'react';
import io from 'socket.io-client';

import Header from 'app/components/Header';
import SideMenu from 'app/components/SideMenu';
import OfflineNotifier from 'app/components/OfflineNotifier';
import ImgList from 'app/components/ImgList';



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
		this.socket = io(window.hostname);
		this.socket.on('connect',this.handleOnline);
		this.socket.on('disconnect',this.handleOffline);
	}

	handleOnline = () => {this.setState({ isOnline: true })};
	handleOffline = () => {this.setState({ isOnline: false })};

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

		let authWin = window.open(mapperURL[provider], 'RESTAPP Auth window', "menubar=no,location=no,resizable=no,scrollbars=yes,status=no")
		let authChecker = setInterval(() => {
			if (authWin.closed) { clearInterval(authChecker); }
			this.checkAuth().then((userData) => {
				if (userData) {
					authWin.close();
					this.processLogin();
				}
			})
		}
			, 1000);
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
		return (<div>
			<Header
				handleAuthFormShow={this.handleAuthFormShow}
				handleAuthFormHide={this.handleAuthFormHide}
				isAuthFormShown={this.state.isAuthFormShown}
				isAuthenticated={this.state.isAuthenticated}
				userInfo={this.state.userInfo}
				handleAuthFormDoAuth={this.handleAuthFormDoAuth}
				isOnline={this.state.isOnline}
			/>
			<SideMenu
				sideMenu={this.state.sideMenu}
			/>
			<OfflineNotifier isOnline={this.state.isOnline} />
			<ImgList
				tilesData={this.state.tilesData}
			/>
		</div>
		)
	}
}

export default MainPage;

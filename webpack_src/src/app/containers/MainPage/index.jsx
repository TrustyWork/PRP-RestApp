import React from 'react';
import store from 'app/store';
import { fetchMyUserData } from 'app/actions/auth'

import Header from 'app/components/Header';
import SideMenu from 'app/components/SideMenu';
import OfflineNotifier from 'app/components/OfflineNotifier';
import ImgList from 'app/components/ImgList';

import style from './style.scss';


class MainPage extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {

		// 	//user info
		// 	isAuthenticated: false,
		// 	userInfo: {},

		// 	//app state
		// 	isAuthFormShown: false,
		// 	// isOnline: true,
		// }

	}




	componentDidMount() {
		store.dispatch(fetchMyUserData());
		// this.checkAuth()
		// 	.then((userinfo) => {
		// 		userinfo ?
		// 			this.setState({
		// 				userInfo: userinfo,
		// 				isAuthenticated: true
		// 			})
		// 			:
		// 			this.setState({
		// 				userInfo: {},
		// 				isAuthenticated: false,
		// 			})
		// 	});
	}

	render() {
		return (
			<div className={style.wrapper}>
				<div className={style.header}>
					<Header/>
				</div>
				<div className={style.wrapper2}>
					<div className={style.sidemenu}>
						<SideMenu/>
					</div>
					<div className={style.content}>
						<ImgList/>
					</div>
				</div>
				<OfflineNotifier />
			</div>
		)
	}
}

export default MainPage;

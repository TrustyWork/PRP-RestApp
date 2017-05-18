import React from 'react';
import Header from 'app/components/Header.jsx';
import SideMenu from 'app/components/SideMenu';

class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

			//user info
			isAuthenticated: false,
			userInfo: {},

			//app state
			isAuthFormShown: false,
		}

	}

	//Handlers for authForm
	handleAuthFormShow = () => {
		this.setState({ isAuthFormShown: true })
	}

	handleAuthFormHide = () => {
		this.setState({ isAuthFormShown: false })
	}
	componentDidMount() {
		fetch('/api/whoami', { credentials: 'include' })
			.then((response) => response.json())
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
			/>
			<SideMenu />
		</div>
		)
	}
}

export default MainPage;
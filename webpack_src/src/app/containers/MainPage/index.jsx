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

	render() {
		return (<div>
			<Header
				handleAuthFormShow={this.handleAuthFormShow}
				handleAuthFormHide={this.handleAuthFormHide}
				isAuthFormShown={this.state.isAuthFormShown}
				isAuthenticated={this.state.isAuthenticated}
			/>
			<SideMenu />
		</div>
		)
	}
}

export default MainPage;
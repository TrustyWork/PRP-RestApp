import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import style from './style.scss'
const socialBtnStyle = {
	marginBottom: "14px",
	border: "1px solid gray"
};

export default class AuthForm extends React.Component {

	state = {
		isShown: false
	}

	handleOpen = () => {
		this.setState({ isShown: true })
	}

	handleClose = () => {
		this.setState({ isShown: false })
	}

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.handleClose}
			/>,
		];

		return (

			<div>
				<MenuItem primaryText="Login..." onTouchTap={this.handleOpen} />
				{/*<FlatButton label="Modal Dialog" onTouchTap={this.handleOpen} />*/}
				<Dialog
					title="Create new account"
					titleClassName={style.title}
					actions={actions}
					modal={false}
					open={this.state.isShown}
					onRequestClose={this.handleClose}
					bodyClassName={style.body}
				>
					<div className={style.maincolumn}>
						<FlatButton
							fullWidth={true}
							backgroundColor="#3b5999"
							hoverColor="#3b5999"
							label="Connect with Facebook"
							style={socialBtnStyle}
						/>
						<FlatButton
							fullWidth={true}
							backgroundColor="#dd4b39"
							hoverColor="#dd4b39"
							label="Connect with Google"
							style={socialBtnStyle}
						/>
						<FlatButton
							fullWidth={true}
							backgroundColor="#0077b5"
							hoverColor="#0077B5"
							label="Connect with Linkedin"
							style={socialBtnStyle}
						/>
						<FlatButton
							fullWidth={true}
							backgroundColor="#FFFFFF"
							hoverColor="#FFFFFF"
							label="Connect with Instagram"
							style={socialBtnStyle}
						/>
					</div>

					<div className={style.maincolumn}>
						<TextField
							hintText="Name"
						/>
						<TextField
							hintText="Email"
						/>
						<TextField
							hintText="Password"
						/>
						<FlatButton
							fullWidth={true}
							backgroundColor="#CCCCC"
							hoverColor="#CCCCCC"
							label="Create account"
							style={{...socialBtnStyle, marginTop: '6px'}}
						/>
					</div>
				</Dialog>
			</div>

		)
	}
}
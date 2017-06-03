import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import style from './style.scss'
import * as authActions from 'app/actions/auth'

const socialBtnStyle = {
	border: "1px solid rgba(100,100,100,0.5)",
	textAlign: "left"
};
const isAuthFormShown = "", handleAuthFormHide = "", handleAuthFormShow = "", handleAuthFormDoAuth = "";
//{ isAuthFormShown, handleAuthFormHide, handleAuthFormShow, handleAuthFormDoAuth, ...props }
const AuthForm = (props) => {
	return (
		<div>
			<MenuItem primaryText="Login..." onTouchTap={props.actions.authFormShow} />
			<Dialog
				title="Create new account"
				titleClassName={style.title}
				modal={false}
				open={props.isShown}
				onRequestClose={props.actions.authFormHide}
				bodyClassName={style.body}
			>
				<div className={style.maincolumn}>
					<FlatButton
						fullWidth={true}
						backgroundColor="#3b5999"
						hoverColor="#3b5999"
						label="Connect with Facebook"
						icon={<FontIcon className={"fa fa-facebook-official"} />}
						style={{ ...socialBtnStyle, color: "#FFFFFF", }}
						onTouchTap={() => handleAuthFormDoAuth('fb')}
					/>
					<FlatButton
						fullWidth={true}
						backgroundColor="#dd4b39"
						hoverColor="#dd4b39"
						label="Connect with Google"
						icon={<FontIcon className={"fa fa-google"} />}
						style={{ ...socialBtnStyle, color: "#FFFFFF", }}
						onTouchTap={() => handleAuthFormDoAuth('gl')}
					/>
					<FlatButton
						fullWidth={true}
						backgroundColor="#0077b5"
						hoverColor="#0077B5"
						label="Connect with Linkedin"
						icon={<FontIcon className={"fa fa-linkedin-square"} />}
						style={{ ...socialBtnStyle, color: "#FFFFFF", }}
						onTouchTap={() => handleAuthFormDoAuth('in')}
					/>
					<FlatButton
						fullWidth={true}
						backgroundColor="#FFFFFF"
						hoverColor="#FFFFFF"
						label="Connect with Instagram"
						icon={<FontIcon className={"fa fa-instagram"} />}
						style={{ ...socialBtnStyle, color: "#000000", }}
						onTouchTap={() => handleAuthFormDoAuth('insta')}
					/>
				</div>
				<div className={style.middlecolumn}> <div className={style.middlecolumntext} >or</div> </div>
				<div className={style.maincolumn}>
					<TextField
						hintText="Name"
						fullWidth={true}
						onChange={(ev) => { props.actions.authFormFieldsChanged({ username: ev.target.value }) }}
					/>
					<TextField
						hintText="Email"
						fullWidth={true}
						onChange={(ev) => { props.actions.authFormFieldsChanged({ email: ev.target.value }) }}
					/>
					<TextField
						hintText="Password"
						fullWidth={true}
						onChange={(ev) => { props.actions.authFormFieldsChanged({ password: ev.target.value }) }}
					/>
					<FlatButton
						fullWidth={true}
						backgroundColor="#CCCCC"
						hoverColor="#CCCCCC"
						label="Create account"
						style={{ ...socialBtnStyle, color: "#000000" }}
					/>
				</div>
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
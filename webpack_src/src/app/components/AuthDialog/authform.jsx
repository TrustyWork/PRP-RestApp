import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import style from './style.scss';
import { connect } from 'react-redux';
import { Tab, Tabs } from 'material-ui/Tabs';
import SignupForm from './signupform';
import SigninForm from './signinform';


const socialBtnStyle = {
	border: "1px solid rgba(100,100,100,0.5)",
	textAlign: "left"
};

let AuthForm = (props) => {
	const { handleLocalAuth, handleExternalAuth, dispatch } = props;
	//	const { handleSubmit, handleExternalAuth, dispatch, submitting } = props;

	return (
		<div className={style.body}>
			<div className={style.maincolumn}>
				<FlatButton
					fullWidth={true}
					backgroundColor="#3b5999"
					hoverColor="#3b5999"
					label="Connect with Facebook"
					icon={<FontIcon className={"fa fa-facebook-official"} />}
					style={{ ...socialBtnStyle, color: "#FFFFFF", }}
					onTouchTap={() => handleExternalAuth('fb', dispatch)}
				/>
				<FlatButton
					fullWidth={true}
					backgroundColor="#dd4b39"
					hoverColor="#dd4b39"
					label="Connect with Google"
					icon={<FontIcon className={"fa fa-google"} />}
					style={{ ...socialBtnStyle, color: "#FFFFFF", }}
					onTouchTap={() => handleExternalAuth('gl', dispatch)}
				/>
				<FlatButton
					fullWidth={true}
					backgroundColor="#0077b5"
					hoverColor="#0077B5"
					label="Connect with Linkedin"
					icon={<FontIcon className={"fa fa-linkedin-square"} />}
					style={{ ...socialBtnStyle, color: "#FFFFFF", }}
					onTouchTap={() => handleExternalAuth('in', dispatch)}
				/>
				<FlatButton
					fullWidth={true}
					backgroundColor="#FFFFFF"
					hoverColor="#FFFFFF"
					label="Connect with Instagram"
					icon={<FontIcon className={"fa fa-instagram"} />}
					style={{ ...socialBtnStyle, color: "#000000", }}
					onTouchTap={() => handleExternalAuth('insta', dispatch)}
				/>
			</div>
			<div className={style.middlecolumn}>
				<div className={style.middlecolumntext} >
					or
				</div>
			</div>
			<div className={style.maincolumn}>
				<Tabs >
					<Tab label="Signup" buttonStyle={{ height: '34px' }} >
						<SignupForm />
					</Tab>
					<Tab label="Signin" buttonStyle={{ height: '34px' }} >
						<SigninForm onSubmit={handleLocalAuth} />
					</Tab>
				</Tabs>
			</div>

			{/*Auth progres...
			{submitting && <div className={style.darken}>
				<CircularProgress size={100} thickness={10} />
			</div>}*/}
		</div>
	)
}



export default connect()(AuthForm);
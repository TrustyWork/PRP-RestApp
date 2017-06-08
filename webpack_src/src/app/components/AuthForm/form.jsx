import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import style from './style.scss';
import { reduxForm, Field } from 'redux-form';

const socialBtnStyle = {
	border: "1px solid rgba(100,100,100,0.5)",
	textAlign: "left"
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
	<TextField
		hintText={label}
		floatingLabelText={label}
		errorText={touched && error}
		{...input}
		{...custom}
	/>
)

const validate = (values) => {

	const errors = {}

	if (!values.username) {
		errors.username = 'username is required!'
	}
	if (!values.email) {
		errors.email = 'email is required!'

	} else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(values.email)) {
		errors.email = 'incorrect format!'
	}

	if (!values.password) {
		errors.password = 'password is required!'
	}
	return errors;
}

let Form = (props) => {
	const { handleSubmit, handleExternalAuth, dispatch, submitting } = props;

	return (
		<form className={style.body}>
			<div className={style.maincolumn}>
				<FlatButton
					fullWidth={true}
					backgroundColor="#3b5999"
					hoverColor="#3b5999"
					label="Connect with Facebook"
					icon={<FontIcon className={"fa fa-facebook-official"} />}
					style={{ ...socialBtnStyle, color: "#FFFFFF", }}
					onTouchTap={() => handleExternalAuth('fb',dispatch)}
				/>
				<FlatButton
					fullWidth={true}
					backgroundColor="#dd4b39"
					hoverColor="#dd4b39"
					label="Connect with Google"
					icon={<FontIcon className={"fa fa-google"} />}
					style={{ ...socialBtnStyle, color: "#FFFFFF", }}
					onTouchTap={() => handleExternalAuth('gl',dispatch)}
				/>
				<FlatButton
					fullWidth={true}
					backgroundColor="#0077b5"
					hoverColor="#0077B5"
					label="Connect with Linkedin"
					icon={<FontIcon className={"fa fa-linkedin-square"} />}
					style={{ ...socialBtnStyle, color: "#FFFFFF", }}
					onTouchTap={() => handleExternalAuth('in',dispatch)}
				/>
				<FlatButton
					fullWidth={true}
					backgroundColor="#FFFFFF"
					hoverColor="#FFFFFF"
					label="Connect with Instagram"
					icon={<FontIcon className={"fa fa-instagram"} />}
					style={{ ...socialBtnStyle, color: "#000000", }}
					onTouchTap={() => handleExternalAuth('insta',dispatch)}
				/>
			</div>
			<div className={style.middlecolumn}> <div className={style.middlecolumntext} >or</div> </div>
			<div className={style.maincolumn}>

				<Field
					name="username"
					component={renderTextField}
					hintText="Name"
				/>

				<Field
					name="email"
					component={renderTextField}
					hintText="email"
				/>
				<Field
					name="password"
					component={renderTextField}
					hintText="password"
				/>
				<FlatButton
					fullWidth={true}
					backgroundColor="#CCCCC"
					hoverColor="#CCCCCC"
					label="Create  account"
					style={{ ...socialBtnStyle, color: "#000000" }}
					onTouchTap={handleSubmit}
				/>
			</div>
			{/*Auth progres...*/}
			{submitting && <div className ={style.darken}>
				<CircularProgress size={100} thickness={10} />
			</div>}
		</form>
	)
}


Form = reduxForm({
	form: 'authForm',
	validate
})(Form)
export default Form;
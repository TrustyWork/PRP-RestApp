import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FormTextField from './formtextfield';
import { reduxForm, Field } from 'redux-form';
import FontIcon from 'material-ui/FontIcon';
import style from './style.scss'

const socialBtnStyle = {
	border: "1px solid rgba(100,100,100,0.5)",
	textAlign: "left"
};

// const asyncValidate = (values) => {
// 	console.log('entering Avalidate');
// 	const validateResult = new Promise((res, rej) => {
// 		socket.emit('/api/user/check', values);
// 		socket.once('/api/user/check', (data) => {
// 			console.log('validated as:', data);
// 			data.error.username || data.error.email  ? rej(data.error) : res({});
// 		})

// 	})

// 	return validateResult;
// }

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

let SignupForm = (props) => {
	const { handleSubmit, dispatch } = props;

	return (
		<form>
			<Field
				fullWidth={true}
				name="username"
				component={FormTextField}
				hintText="Name"
			/>

			<Field
				fullWidth={true}
				name="email"
				component={FormTextField}
				hintText="email"
			/>
			<Field
				fullWidth={true}
				name="password"
				component={FormTextField}
				hintText="password"
			/>
			<FlatButton
				icon={<FontIcon className={"fa fa-key"} />}
				fullWidth={true}
				backgroundColor="#CCCCC"
				hoverColor="#CCCCCC"
				label="Sign Up"
				style={{ ...socialBtnStyle, color: "#000000" }}
				onTouchTap={handleSubmit}
			/>
		</form>
	)
}

SignupForm = reduxForm({
	form: 'signupForm',
	validate,
	// asyncValidate
})(SignupForm);

export default SignupForm;
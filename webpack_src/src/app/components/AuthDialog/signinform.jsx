import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { reduxForm, Field } from 'redux-form';

import FormTextField from './formtextfield';
import style from './style.scss'

import { SubmissionError } from 'redux-form';

const socialBtnStyle = {
	border: "1px solid rgba(100,100,100,0.5)",
	textAlign: "left"
};

//submit handler
const doLocalAuth = (values, dispatch, props) => {

	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');

	const requestOptions = {
		credentials: 'include',
		method: 'POST',
		headers: myHeaders,
		body: JSON.stringify(values)
	}

	let result = fetch('/auth/local', requestOptions)
		.then(res => res.json())
		.then(json => {

			if (json.error) {throw new SubmissionError({email:'tuta nechto!'})}

			dispatch(authActions.authSuccess(json.user));
			// return json.error ?
			// 	throw {email: 'Assa!'}//Promise.reject({ error: { email: 'error here', password: 'or here' } }) //json.error)
			// 	:
			// 	dispatch(authActions.authSuccess(json.user));
		})
		console.log (result);
		return result;
}

const validate = (values) => {

	const errors = {}

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


let SigninForm = (props) => {
	//const { handleSubmit, dispatch } = props;

	return (
		<form onSubmit = {props.handleSubmit(doLocalAuth)}>
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
				type="submit"
				icon={<FontIcon className={"fa fa-sign-in"} />}
				fullWidth={true}
				backgroundColor="#CCCCC"
				hoverColor="#CCCCCC"
				label="Sign In"
				style={{ ...socialBtnStyle, color: "#000000" }}

			/>
		</form>
	)
}

SigninForm = reduxForm({
	form: 'signinForm',
	validate,
	// asyncValidate
})(SigninForm);

export default SigninForm;
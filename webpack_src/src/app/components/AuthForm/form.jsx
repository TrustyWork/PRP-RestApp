import React from 'react';
import style from './style.scss';
import { reduxForm, Field } from 'redux-form';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
	<div>
		<input
			{...input}
			{...custom}
		/>
		<span data-error={touched && error ? error : ""}></span>
	</div>
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
				<button
					type="button"
					className={style.fb}
					onTouchTap={() => handleExternalAuth('fb', dispatch)}
				>
					<span><i className={"fa fa-facebook"}></i></span>
					<span>Connect with Facebook</span>
				</button>

				<button
					type="button"
					className={style.gl}
					onTouchTap={() => handleExternalAuth('gl', dispatch)}
				>
					<i className={"fa fa-google"}></i>
					<span>Connect with Google</span>
				</button>

				<button
					type="button"
					className={style.in}
					onTouchTap={() => handleExternalAuth('in', dispatch)}
				>
					<i className={"fa fa-linkedin-square"}></i>
					<span>Connect with Linkedin</span>
				</button>

				<button
					type="button"
					className={style.ig}
					onTouchTap={() => handleExternalAuth('insta', dispatch)}
				>
					<i className={"fa fa-instagram"}></i>
					<span>Connect with Instagram</span>
				</button>
			</div>
			<div className={style.middlecolumn}> <div className={style.middlecolumntext} >or</div> </div>
			<div className={style.maincolumn}>

				<Field
					name="username"
					component={renderTextField}
					placeholder="Username"
				/>

				<Field
					name="email"
					component={renderTextField}
					placeholder="Email"
				/>
				<Field
					name="password"
					type="password"
					component={renderTextField}
					placeholder="password"
				/>
				<button
					type="submit"
					onTouchTap={handleSubmit}
				>
					Login local
				</button>
			</div>
		</form>
	)
}


Form = reduxForm({
	form: 'authForm',
	validate
})(Form)
export default Form;
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
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

let Form = (props) => {
	const {handleSubmit} = props;
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

				<Field
					name="firstName"
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
		</form>
	)
}


Form = reduxForm({ form: 'authForm' })(Form)
export default Form;
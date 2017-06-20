import React from 'react';
import TextField from 'material-ui/TextField';

const FormTextField = ({ input, label, meta: { touched, error }, ...others }) => (
	<TextField
		hintText={label}
		floatingLabelText={label}
		errorText={touched && error}
		{...input}
		{...others}
	/>
)

export default FormTextField;
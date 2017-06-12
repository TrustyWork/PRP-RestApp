export const authFormShow = () => {
	return {
		type: 'LOGIN_FORM_SHOW'
	}
}

export const authFormHide = () => {
	return {
		type: 'LOGIN_FORM_HIDE'
	}
}

export const authSuccess = (user) => {
	return {
		type: 'AUTH_SUCCESS',
		payload: user
	}
}

export const authLogout = () => {
	return {
		type: 'LOGOUT'
	}
}
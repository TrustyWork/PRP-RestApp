const initialState = {
	isShown: false
}

const reducer = (state = initialState, action) => {
	let _state = Object.assign({}, state);
	switch (action.type) {
		case 'LOGIN_FORM_SHOW':
			_state.isShown = true;
			break;
		case 'LOGIN_FORM_HIDE':
		case 'AUTH_SUCCESS':
			_state.isShown = false;
			break;
		default:
			return state;
	}
	return _state;
}

export default reducer
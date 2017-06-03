const initialState = {
	isShown: false,
	username: '',
	email: '',
	password: ''
}

const reducer = (state=initialState,action) => {
	let _state = Object.assign({}, state);
	switch(action.type) {
		case 'LOGIN_FORM_SHOW':
			_state.isShown = true;
			break;
		case 'LOGIN_FORM_HIDE':
			_state.isShown = false;
			break;
		default:
			return state;
	}
	return _state;
}

export default reducer
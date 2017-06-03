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
		case 'LOGIN_FORM_FIELDS_CHANGED':
			_state.username = action.payload.username || _state.username;
			_state.email = action.payload.email || _state.email;
			_state.password = action.payload.password || _state.password;
			break;
		default:
			return state;
	}
	return _state;
}

export default reducer
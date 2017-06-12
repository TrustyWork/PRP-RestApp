const initialState = {
	username: null,
	email: null,
	uid: null
}

const reducer = (state = initialState, action) => {
	let _state = Object.assign({},state);

	switch (action.type) {
		case 'AUTH_SUCCESS':
			_state.username = action.payload.username;
			_state.email = action.payload.email;
			_state.uid = action.payload._id;
			break;
		case 'LOGOUT':
			_state = initialState;
			break;
		default:
			return state;
	}

	return _state;
}

export default reducer;
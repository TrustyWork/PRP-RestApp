
const initialState = {
	isOnline: true,
	user: null
}

const reducer = (state = initialState, action) => {
	let _state = Object.assign({}, state);
	switch (action.type) {
		case 'APP_ONLINE':
			_state.isOnline = true;
			break;
		case 'APP_OFFLINE':
			_state.isOnline = false;
			break;
		case 'AUTH_SUCCESS':
			_state.user = action.payload._id
			break;
		case 'LOGOUT':
			_state.user = null;
			break;
		default:
			return state;
	}
	return _state;
}

export default reducer;
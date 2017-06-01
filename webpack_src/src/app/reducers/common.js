
const initialState = { isOnline: true }

const reducer = (state = initialState, action) => {
	let _state = Object.assign({}, state);
	switch (action.type) {
		case 'APP_ONLINE':
			_state.isOnline = true;
			break;
		case 'APP_OFFLINE':
			_state.isOnline = false;
			break;
		default:
			return state;
	}
	return _state;
}

export default reducer;
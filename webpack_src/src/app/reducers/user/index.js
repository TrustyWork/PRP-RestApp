const initialState = {
	username: null,
	email: null,
	uid: null
}

const reducer = (state = initialState, action) => {
	let _state = Object.assign({},state);

	switch (action.type) {
		case '_':
			break;

		default:
			return state;
	}

	return _state;
}

export default reducer;
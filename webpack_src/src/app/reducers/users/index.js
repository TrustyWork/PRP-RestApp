const initialState = {

}

const reducer = (state = initialState, action) => {

	let _state = { ...state }

	switch (action.type) {
		case 'AUTH_SUCCESS':
			_state = {
				...state,
				[action.payload._id]: {
					username: action.payload.username,
					email: action.payload.email,
					uid: action.payload._id
				}
			}
			break;
		default:
			return state;
	}

	return _state;
}

export default reducer;
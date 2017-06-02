export default (initialState = null) => {

	const reducer = (state=initialStatem, action) => {

		let _state = Object.assign({}, state);

		switch (acttion.type) {
			case 'SET':
				_state = Object.assign(_state, action.payload);
				break;
			default:
				return state;
		}
		return _state;
	}
}
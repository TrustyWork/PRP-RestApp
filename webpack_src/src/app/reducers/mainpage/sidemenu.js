
const initialState = [
	{
		item: 'Favorites',
		icon: 'fa fa-heart'

	},
	{
		item: 'Promotional',
		icon: 'fa fa-birthday-cake'

	},
	{
		item: 'Hot',
		icon: 'fa fa-exclamation-circle'

	},
]

const reducer = (state = initialState, action) => {
	let _state = state.map((itm) => Object.assign({}, itm))
	switch (action.type) {
		case 'ADD_SIDEMENU_ENTRY':
			_state.push(action.payload);
			break;
		case 'REMOVE_SIDEMENU_ENTRY': console.log('ADD_ENTRY:', action.payload);
			break;
		default:
			return state;
	}
	return _state;
}

export default reducer
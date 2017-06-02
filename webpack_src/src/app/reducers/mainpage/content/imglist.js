const initialState = [
	{
		img: 'http://placehold.it/350x350',
		title: 'Breakfast',
		author: 'jill111',
		idx: 1
	},
	{
		img: 'http://placehold.it/350x350',
		title: 'Tasty burger',
		author: 'pashminu',
		idx: 2
	},
	{
		img: 'http://placehold.it/350x350',
		title: 'Camera',
		author: 'Danson67',
		idx: 3
	},
	{
		img: 'http://placehold.it/350x350',
		title: 'Morning',
		author: 'fancycrave1',
		idx: 4
	},
	{
		img: 'http://placehold.it/350x350',
		title: 'Hats',
		author: 'Hans',
		idx: 5
	}
]


const reducer = (state = initialState, action) => {

	let _state = state.map((itm) => { return { ...itm } }) //
	switch (action.type) {
		case 'REPLACE_PIC_BY_IDX':
			_state[action.payload.idx].img = action.payload.url;
			break;
		default:
			return state;
	}

	return _state;
}
export default reducer;
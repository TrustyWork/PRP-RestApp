const initialState  = {
	tilesData: [
				{
					img: 'http://placehold.it/349x349',
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
}

const reducer = (state = initialState, action) => {
	let _state = JSON.parse(JSON.stringify(state));//Object.assign({}, state);
	switch (action.type) {
		case 'REPLACE_PIC_BY_IDX':
			_state.tilesData[action.data.idx].img = action.data.url;
			break;
		default:
			return state;
	}

	return _state;
}
export default reducer;
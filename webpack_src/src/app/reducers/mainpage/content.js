const initialState  = {
	tilesData: [
				{
					img: 'http://placehold.it/350x350',
					title: 'Breakfast',
					author: 'jill111',
				},
				{
					img: 'http://placehold.it/350x350',
					title: 'Tasty burger',
					author: 'pashminu',
				},
				{
					img: 'http://placehold.it/350x350',
					title: 'Camera',
					author: 'Danson67',
				},
				{
					img: 'http://placehold.it/350x350',
					title: 'Morning',
					author: 'fancycrave1',
				},
				{
					img: 'http://placehold.it/350x350',
					title: 'Hats',
					author: 'Hans',
				}
			]
}

const reducer = (state = initialState, action) => {
	let _state = Object.assign({}, state);
	switch (action.type) {
		case '':
			break;
		default:
			return state;
	}

}
export default reducer;
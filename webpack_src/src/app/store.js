import { createStore } from 'redux';
import reducers from 'app/reducers';

let store = createStore(reducers,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
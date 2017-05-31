import { createStore } from 'redux';
import reducers from 'app/reducers';

let store = createStore(reducers);

export default store;
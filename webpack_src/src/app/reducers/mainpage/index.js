import {combineReducers} from 'redux';
import sidemenu from './sidemenu';
import content from './content';

export default combineReducers({
	sidemenu,
	content
})
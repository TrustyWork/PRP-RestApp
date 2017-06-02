import { combineReducers } from 'redux';
import commonSet from './commonSet';
import mainpage from './mainpage';
import common from './common';
import dialogs from './dialogs';

export default combineReducers({
	mainpage,
	common,
	dialogs
})
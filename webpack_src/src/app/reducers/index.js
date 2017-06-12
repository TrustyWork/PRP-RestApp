import { combineReducers } from 'redux';
import commonSet from './commonSet';
import mainpage from './mainpage';
import common from './common';
import dialogs from './dialogs';
import user from './user';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
	mainpage,
	common,
	dialogs,
	user,
	form: formReducer
})
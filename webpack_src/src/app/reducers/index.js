import { combineReducers } from 'redux';
import commonSet from './commonSet';
import mainpage from './mainpage';
import common from './common'

export default combineReducers({
	mainpage,
	common
})
import React from 'react';
import { connect } from 'react-redux';

import style from './style.scss';


const OfflineNotifier = (props) => {
	let { isOnline } = props.common;
	let currentStyle = isOnline ? style.online : style.offline;
	return (
		<div className={`${style.snackbar} ${currentStyle}`}>
			<span>OFFLINE</span>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		common: state.common
	}
}

export default connect(mapStateToProps)(OfflineNotifier);

import React from 'react';
import Snackbar from 'material-ui/Snackbar';

import style from './style.scss';

//Snackbar is binded top by styles, instead of bottom
const OfflineNotifier = ({ isOnline, ...props }) => {
	return (
		<Snackbar
			open={!isOnline}
			bodyStyle={{
				backgroundColor: "#CC0000"
			}}
			style={{
				backgroundColor: "#CC0000",
				opacity: '0.7',
				bottom: 'auto',
				top: 0,
				transform: !isOnline ? 'translate(-50%, 0)' : 'translate(-50%, -50px)',
			}}
			message="Warning! You are offline"
			autoHideDuration={60000}
			onRequestClose={() => { }}
		/>
	)
}

export default OfflineNotifier;
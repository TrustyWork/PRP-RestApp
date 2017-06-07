const io = require('wss');
const express = require('express');
const router = express.Router();

	router.all('/', (req, res) => {
		//user should be authentificated to go ahead.
		if (req.user) {

//			io.sendToUid(`uid_${req.user._id.toString()}`,`Login from ${req.headers['user-agent']}` );
			req.app.emit('user_auth_ok', { userID: req.user._id.toString() });
			res.redirect('/users');
		} else {
			res.redirect('/');
		}
	})

module.exports = router;
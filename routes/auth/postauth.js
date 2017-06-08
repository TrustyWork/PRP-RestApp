const io = require('wss');
const express = require('express');
const router = express.Router();

	router.all('/', (req, res) => {
		//user should be authentificated to go ahead.
		console.log('entering PostAuth...');
		if (req.user) {

			req.app.emit('user_auth_ok', { userID: req.user._id.toString() });
			res.redirect('/users');
		} else {
			res.redirect('/');
		}
	})

module.exports = router;
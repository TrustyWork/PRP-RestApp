const io = require('ws_server');
const express = require('express');
const router = express.Router();

	router.all('/', (req, res) => {
		//user should be authentificated to go ahead.
		console.log('entering PostAuth...');
		if (req.user) {
			console.log(req.session);
			req.app.emit('user_auth_ok', { sessID: req.session.id });
			res.redirect('/users');
		} else {
			res.redirect('/');
		}
	})

module.exports = router;
const express = require('express');
const router = express.Router();

router.all('/', (req, res) => {

	//user should be authentificated to go ahead.
	if (req.user) {
		console.log('PiostAuth processing...');
		req.app.emit('rest_auth_ok',{userID:req.user._id.toString()});
		res.redirect('/users');
	} else {
		res.redirect('/');
	}
})

module.exports = router;
const express = require('express');
const router = express.Router();

router.all('/', (req, res) => {
	if (req.user) {
		req.app.emit('user_logout', { userID: req.user._id.toString() });
		req.logOut();
	}
	res.redirect('/');
})

module.exports = router;
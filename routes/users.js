const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
	res.render('users', {title: req.user.username});
});

module.exports = router;

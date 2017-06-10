const express = require('express');
const router = express.Router();
const mwCheckAuth = require('./util').mwCheckAuth;

/* GET users listing. */
router.get('/', mwCheckAuth, function (req, res) {
	res.render('users', {title: req.user.username});
});

module.exports = router;

const express = require('express');
const router = express.Router();

const userModel = require('models/user');

//Instagram auth handler
router.get('/', function (req, res) {
	res.send('insta root')
});

router.get('/callback', function (req, res) {
	res.send('insta callback')
});


module.exports = router;

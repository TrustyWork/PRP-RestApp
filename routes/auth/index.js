const express = require('express');
const router = express.Router();

//auth handlers for various strategies
const insta = require('./insta');
const local = require('./local')

//auth routes
router.use('/insta', insta);
router.use('/local', local);

router.get('/', function (req, res) {
	res.send('Auth route')
});

module.exports = router;

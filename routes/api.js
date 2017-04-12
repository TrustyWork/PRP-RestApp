const express = require('express');
const router = express.Router();

const userModel = require('models/user');

/* OUR API */
router.get('/', function (req, res) {
	res.send('API Route')
});

router.post('/register', function (req, res, next) {
	console.log(`\nregister new user: ${req.body.username} ${req.body.password} \n`);
	userModel.register(new userModel({username: req.body.username}), req.body.password, (err) => {
		if (err) {
			console.log('Registration fail:', err);
			return next(err);
		}
		res.redirect('/users');
	});

});

module.exports = router;

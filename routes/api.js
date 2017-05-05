const express = require('express');
const router = express.Router();

const userModel = require('models/user');

/* OUR API */
router.get('/', function (req, res) {
	res.send('API Route')
});

router.post('/register', function (req, res, next) {
	console.log(`\nregister new user: ${req.body.username} ${req.body.password} \n`);
	userModel.register(new userModel({ username: req.body.username }), req.body.password, (err) => {
		if (err) {
			console.log('Registration fail:', err);
			return next(err);
		}
		res.redirect('/users');
	});

});

router.get('/whoami', function (req, res, next) {

		if (req.user) {
			res.json(req.user.auth);
		}
		else {
			res.status(401);
			res.json(null);
		}
	})

module.exports = router;

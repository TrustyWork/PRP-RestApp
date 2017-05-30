const express = require('express');
const router = express.Router();

const authModel = require('models/auth');

/* OUR API */
router.get('/', function (req, res) {
	res.send('API Route')
});

router.post('/register', function (req, res, next) {
	authModel.registerLocal(
		{
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		},
		err => {
			if (err) {
				return next(err);
			} else {
				res.redirect('/users');
			}
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

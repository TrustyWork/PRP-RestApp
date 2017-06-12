module.exports = (req, res, next) => (err, user, info) => {

	if (err) { return next(err); }

	// auth fail
	if (!user) { return res.json({ error: info }) }

	//auth success
	req.logIn(user, function (err) {
		if (err) { return next(err); }
		//req.app.emit('user_auth_ok', { sessID: req.session.id });
		return res.json({ error: null, user: user })
	});
}
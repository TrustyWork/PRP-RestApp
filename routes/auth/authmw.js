const sendToSid = require('emits_io').sendToSid;

module.exports = (req, res, next) => (err, user, info) => {

	if (err) { return next(err); }

	// auth fail
	if (!user) { return res.json({ error: info }) }

	//auth success
	req.logIn(user, function (err) {
		if (err) { return next(err); }
		sendToSid('/api/auth/success', { user: user }, req.session.id);
		return res.json({ error: null, user: user })
	});
}
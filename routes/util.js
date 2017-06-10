
exports.mwCheckAuth = (req, res, next) => {
	return req.user ? next() : res.json({error: 'authentification needed'});
}


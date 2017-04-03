var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('rest_users', {user: req.user, title: 'Вход', logInWarn: req.flash('logInWarn')});
});

module.exports = router;
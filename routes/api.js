var express = require('express');
var router = express.Router();

/* OUR API */
router.get('/', function(req, res, next) {
  res.send('API Route')
});



/Passport AUTH API/
router.post('/auth/', function(req, res, next) {
  res.end();
});




module.exports = router;

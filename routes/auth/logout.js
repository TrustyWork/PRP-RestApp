const express = require('express');
const router = express.Router();

router.all('/', (req,res)=>{
	req.logOut();
	res.redirect('/');
})

module.exports = router;
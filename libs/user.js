const userModel = require('models/user');

const users = {};

userModel.find('{}').exec()
	.then((docs) => {
		console.log(`caching User_Docs... ${docs.length} docs`)
		docs.forEach((doc) => {
			users[doc._id.toString()] = doc
		})
	})
	.catch((err) => { console.warn(err) });



module.exports = users;
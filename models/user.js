const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = {

	// _id will be created by Mongo

	role: {
		stuff: [{
			type: Schema.Types.ObjectId,
			ref: 'Rest'
		}],
		restorator: [{
			type: Schema.Types.ObjectId,
			ref: 'Rest'
		}]
	},

	auth: {

		// fb: Schema.Types.Mixed,
		// gl: Schema.Types.Mixed
	},

	birthday: {
		type: Date
	},

	gender: {
		type: String
	},

	createTime: {
		type: Date, default: Date.now
	},
	modifyTime: {
		type: Date, default: Date.now
	},

}

const User = new Schema(UserSchema);

User.plugin(passportLocalMongoose, {
	limitAttempts: false,
});

module.exports = mongoose.model('User', User);
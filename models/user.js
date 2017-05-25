const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = {
	// _id will be created by Mongo

	username: {
		type: Schema.Types.String
	},

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

	auth: [{
		type: Schema.Types.ObjectId,
		ref: 'Auth'
	}],

	email: {
		type: Schema.Types.String
	},

	birthday: {
		type: Schema.Types.Date
	},

	gender: {
		type: Schema.Types.String
	},

	createTime: {
		type: Schema.Types.Date,
		default: Date.now
	},

	modifyTime: {
		type: Schema.Types.Date,
		default: Date.now
	},

}

const User = new Schema(UserSchema);


//(De)serialize users by email
User.statics.serializeUser = function () {
	return  (user, cb) => {
		cb(null, user.get('email'));
	};
};

User.statics.deserializeUser = function () {

	let self = this;
	return (email, cb) => {
		const query = { email: email };
		self.findOne(query)
			.then((user) => cb(null, user))
			.catch((err) => cb(err, null))
	};
};

module.exports = mongoose.model('User', User);
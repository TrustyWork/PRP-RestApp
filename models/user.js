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


//user -> id
User.statics.serializeUser = function () {
	return (user, done) => {
		done(null, user.get('_id'));
	}
};

//id -> user
User.statics.deserializeUser = function () {
	return (id, done) => {
		this.findOne({ _id: id })
			.then((user) => done(null, user))
			.catch((err) => done(err, null));
	}
};

User.methods.updateAuthRef = function (ref) {
	this.auth.push(ref);
	return this.save();
}

/**
 * @return {Promise}
 */
User.statics.findByEmail = function (email) {
	return this.findOne({ email: email }).exec();
}
module.exports = mongoose.model('User', User);
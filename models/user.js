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
		vkontakte: Schema.Types.Mixed,
		instagram: Schema.Types.Mixed
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
	}
};

const User = new Schema(UserSchema);


User.statics.findOrCreate = function (profile, cb) {

	let prop = `auth.${profile.provider}.id`;
	let query = {[prop]: profile.id};
	console.log(profile.id + " this is ID");
	this.findOne(query, (err, user) => {
		if (err) {
			return cb(err)
		}
		//console.log(profile + " this is  profiel");
		//console.log(user + " this is user")
		if (!user) {
			user = new this({username: profile.username});
			user.auth[profile.provider] = profile;
			user.save(function (err) {
				if (err) {
					return cb(err);
				}
				return cb(null, user);
			})
		}
		//console.log(user + " this is user");
		return cb(null, user);
	})
};



User.plugin(passportLocalMongoose, {
	limitAttempts: false,
});

module.exports = mongoose.model('User', User);
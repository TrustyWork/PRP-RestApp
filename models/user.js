var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = {

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
		instagram: Schema.Types.Mixed,
		// fb: Schema.Types.Mixed,
		google: Schema.Types.Mixed
	},

    birthday: {
        type: Date
    },

    gender: {
        type: String
    },

    createTime : {
        type: Date, default: Date.now
    },
    modifyTime : {
        type: Date, default: Date.now
    },

}

const User = new Schema(UserSchema);

User.statics.findOrCreate = function (profile, cb) {

	let self = this;

	let prop = `auth.${profile.provider}.id`
	let query = { [prop]: profile.id };
	console.log(query);
	this.findOne(query, (err, user) => {
		if (err) { return cb(err) }

		if (!user) {
			user = new self({ username: profile.username });
			user.auth[profile.provider] = profile;
			user.save(function (err) {
				if (err) {
					return cb(err);
				}
				return cb(null, user);
			})
		}
		return cb(null, user);
	})

}

User.plugin(passportLocalMongoose, {
	limitAttempts: false,
});

module.exports = mongoose.model('User', User);
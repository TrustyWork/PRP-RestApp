const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const userModel = require('models/user');

const AuthSchema = {

	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: { unique: false }},

	provider: Schema.Types.String,

	data: Schema.Types.Mixed,

	//not used yet. needed by passport.local.
	username: {
		type: Schema.Types.String,
		index: { unique: false }},
}

const Auth = new Schema(AuthSchema);

Auth.statics.findOrCreate = function (profile, cb) {

	let query = {
		provider: profile.provider
	}

	this.findOne(query).where('data.id').equals(profile.id).exec()
		.then((authData) => {

			if (authData) {
				return userModel.findOne({ _id: authData.user })
					.then((user) => cb(null, user))
					.catch((err) => cb(err, null))
			} else {

				// authData not found. Try to find user by email in authData
				// if user found, add only new autData.
				// if not - create User+autData records.
				query = { email: profile.emails[0].value }

				return userModel.findOne(query)
					.then((user) => {
						if (user) {

							//user found. Create only new authRecord
							let authRecord = new this({
								user: user._id,
								provider: profile.provider,
								data: profile._json
							})
							authRecord.save()
								.then(() => cb(null, user))
								.catch((err) => cb(err, null))
						} else {
							//no user, no authRecords
							let user = new userModel({ username: profile.username });
							let authRecord = new this({
								user: user._id,
								provider: profile.provider,
								data: profile._json
							})
							// fill user fields
							user.auth = authRecord._id;
							user.email = profile.emails[0].value;
							user.username = profile.username
							//save all
							return Promise.all([user.save(), authRecord.save()])
								.then(() => cb(null, user))
								.catch((err) => cb(err, null))
						}
					})
			}
		})
};

Auth.plugin(passportLocalMongoose, {
	limitAttempts: false,
});

module.exports = mongoose.model('Auth', Auth);
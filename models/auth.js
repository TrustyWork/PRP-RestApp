const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const userModel = require('models/user');

const AuthSchema = {

	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: { unique: false }
	},

	provider: Schema.Types.String,

	data: Schema.Types.Mixed,

	//not used yet. needed by passport.local.
	username: {
		type: Schema.Types.String,
		index: { unique: false }
	},
}

const Auth = new Schema(AuthSchema);

Auth.statics.findOrCreate = function (profile, cb) {

	let query = {
		'data.id': profile.id,
		provider: profile.provider
	}

	this.findOne(query).exec()
		.then((authData) => {
			if (authData) {
				return cb(null, authData);
			} else {
				// authData not found. Try to find user by email in users
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
							//update user with auth ref.
							user.auth.push(authRecord._id);
							return Promise.all([user.save(), authRecord.save()])
								.then(() => cb(null, authRecord))
								.catch((err) => cb(err, null))
						} else {
							//no users, no authRecords
							let user = new userModel({});

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
								.then(() => cb(null, authRecord))
								.catch((err) => cb(err, null))
						}
					})
			}
		})
		.catch((err) => cb(err, null))
};


Auth.plugin(passportLocalMongoose, {
	limitAttempts: false,
	usernameField: 'email'
});


//redefine passportLocalMongose schema.statics.register with my version
Auth.statics.registerLocal = function (userData, cb) {

	if (!userData.email) {
		return cb(new Error('Yoy need email to register!'));
	}
	//try to find authData by email.
	let query = { email: userData.email };
	userModel.findOne(query)
		.then(user => {
			if (user) { throw new Error(`User with ${userData.email} already exist!`) }
			//let's build local profile
			let profile = {
				id: userData.email,
				provider: 'local',
				username: userData.username,
				displayName: userData.username,
				emails: [{ value: userData.email }],
				_json: { dumb: 'dumb' }
			}

			return new Promise((res, rej) => {
				this.findOrCreate(profile, (err, authData) => {
					if (err) {
						rej(new Error('Can"t create user:', err));
					} else {
						res(authData);
					}
				})
			})
		})
		.then(authData => {
			return new Promise((res, rej) => {
				authData.setPassword(userData.password, (setPasswordErr, authData) => {
					if (setPasswordErr) {
						rej(new Error(setPasswordErr));
					} else {
						res(authData);
					}
				})
			})
		})
		.then(authData => authData.save())
		.then(authData => cb(null, authData))
		.catch(err => cb(err));
}

Auth.statics.authenticateLocal = function () {

	return (email, password, cb) => {

		let query = {
			email: email
		}

		//populate only with LOCAL auth records
		userModel.findOne(query)
			.populate('auth', 'user hash salt', { provider: { $eq: 'local' } })
			.exec()
			.then(userToAuth => {
				if (!userToAuth) {
					throw new Error('Email not found')
				} else if (!userToAuth.auth.length) {
					throw new Error('Auth data for local auth is not found')
				} else {
					return userToAuth.auth[0]
				}
			})
			.then(authData => {
				return new Promise((res, rej) => {
					authData.authenticate(password, (err, authData) => {
						if (err) {
							rej(err);
						} else if (!authData) {
							rej(new Error('Invalid password (local)'));
						} else {
							res(authData);
						}
					})
				})
			})
			.then(verifiedAuthData => {
				let query = { _id: verifiedAuthData.user }
				return userModel.findOne(query).exec()
			})
			.then(verifiedUser => {
				return cb(null, verifiedUser)
			})
			.catch(err => cb(err, false, 'error:' + err));
	}
}

module.exports = mongoose.model('Auth', Auth);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const userModel = require('models/user');

const AuthSchema = {

	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: { unique: false }
	}
	, provider: Schema.Types.String
	, data: Schema.Types.Mixed
	, token: Schema.Types.String
}

const Auth = new Schema(AuthSchema);

Auth.plugin(passportLocalMongoose, {
	limitAttempts: false,
	usernameField: 'email'
});

/**
 * Add auth Record and update ref in user
 * @returns {Promise}
 * @param  {UserDoc} user
 * @param  {Object} profile
 * @param  {String} token
 */
Auth.statics.addAuthRecord = function (user, profile, token) {

	let authRecord = new this({
		user: user._id
		, provider: profile.provider
		, data: profile._json
		, token: token || null
	})
	return Promise.all([user.updateAuthRef(authRecord._id), authRecord.save()])
		.then(savedDocs => { return { user: savedDocs[0], authRecord: savedDocs[1] } })
}

Auth.statics.findAuthRecord = function (user, provider) {
	let query = {
		user: user._id,
		provider: profile.provider
	}
	return this.findOne(query).exec();
}

Auth.statics.findOrCreate = function (profile, token, cb) {

	let query = {
		'data.id': profile.id,
		provider: profile.provider
	}
	this.findOne(query).exec()
		.then(authData => {
			if (authData) {
				return userModel.findById(authData.user).exec().then(user => cb(null, { user: user, authRecord: authData }));
			} else {
				return userModel.findByEmail(profile.emails[0].value)
					.then(user => {
						if (!user) {
							user = new userModel({
								email: profile.emails[0].value
								, username: profile.username
								, auth: []
							});
						}
						this.addAuthRecord(user, profile, token)
							.then(result => cb(null, result))
							.catch(err => cb(err, null))
					})
			}
		})
		.catch(err => cb(err, null))
};

Auth.statics.registerLocal = function (userData, cb) {

	if (!userData.email || !userData.username) {
		return cb(new Error('Yoy need email and username to register!'));
	}

	let profile = {
		id: userData.email,
		provider: 'local',
		username: userData.username,
		displayName: userData.username,
		emails: [{ value: userData.email }],
		_json: { dumb: 'dumb' }
	}

	return new Promise((res, rej) => {
		this.findOrCreate(profile, null, (err, { authRecord }) => { // get only authRecord
			if (err) {
				rej(new Error('Can"t create user:', err));
			} else {
				res(authRecord);
			}
		})
	})
		.then(authRecord => {
			return new Promise((res, rej) => {
				authRecord.setPassword(userData.password, (setPasswordErr, authData) => {
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
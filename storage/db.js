const mongoose = require('mongoose');
const config = require('config');

mongoose.Promise = global.Promise;
mongoose.connect(config.get('db:uri'),{ config: { autoIndex: false } });

const db = mongoose.connection;

db.on('error', function (err) {
	console.error('connection error:', err.message);
});

db.once('open', function () {
	console.info('Connected to DB!');
});

module.exports = mongoose.connection;
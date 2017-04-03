var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://localhost:27017/test');

var db = mongoose.connection;

db.on( 'error', function ( err) {
    console.error( 'connection error:', err.message);
});

db.once( 'open', function () {
    console.info( 'Connected to DB! (models/index)');
});

RestUserModel = require( '../models/Rest_User_Model');
module.exports = RestUserModel;
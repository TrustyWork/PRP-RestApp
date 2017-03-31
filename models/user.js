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

        // fb: Schema.Types.Mixed,
        // gl: Schema.Types.Mixed
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

var User = new Schema(UserSchema);

User.plugin(passportLocalMongoose, {
limitAttempts: false,
     });

module.exports = mongoose.model('User', User);
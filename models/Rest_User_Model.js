var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var authSchema = new Schema({
    FB: {type: Schema.Types.Mixed},
    VK: {type: Schema.Types.Mixed},
    GH: {type: Schema.Types.Mixed},
    Gl: {
        id: String,
        token: String
        },
    Local: {
        username: {type: String},
        password: {type: String}
    },
});

var roleSchema = new Schema({
    Guest: {type: Schema.Types.Mixed},
    AuthUser: {type: Schema.Types.Mixed},
    Stuff: {type: Schema.Types.Mixed, ref: 'RestaurantModel'},
    Owner: {type: Schema.Types.Mixed, ref: 'RestaurantModel'},
});

var userSchema = new Schema({
    Name: {type: String},
    Gender: {type: String},
    Birthday: {type: Date},
    Contacts: {type: Schema.Types.Mixed},
    Is_banned: {type: Boolean},
    Created: {type: Date},
    AuthField: authSchema,
    Role: roleSchema,
}, {collection: 'rest-users'});

userSchema.methods.getAge = function () {
    if(this.Birthday==null){
        var errmsg = 'Unknown birthday';
        return errmsg;
    }
    var now = new Date();

    var age = now.getFullYear() - this.Birthday.getFullYear();
    if(age >= 0) {
        var months = now.getMonth() - this.Birthday.getMonth();
        if(months > 0) {
            return age;
        } else if(months = 0) {
            var day = now.getDate()- this.Birthday.getDate();
            if(day>0){
                return age;
            } else {
                --age;
                return age;
            }
        } else {
            --age;
            return age;
        }
    } else {
        var errmsg = 'Wrong date of birthday';
        return errmsg;
    };
};

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.AuthField.Local.password)
};

var UserRestModel = mongoose.model('UserRestModel', userSchema);
module.exports = UserRestModel;


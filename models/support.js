const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupportSchema = {
    // _id will be created by Mongo
    author: {
        name: { type: String },
        restaurant: { type: String },
        email: {type: String},
        phone: {type: String},
        account: { type: String },
        kind: { type: String },
        item: { type: Schema.Types.ObjectId, refPath: 'author.kind' },
        index: { unique: false }
    },

    category: {
        type: String,
        enum: ['Phone number error', 'Address error', 'Menu error', 'Other error',
            'My account', 'My bills and payments', 'Website and Mobile App', 'Other',
            'Billing Issues', 'Technical Issues', 'General Issues'],
        required: true
    },

    issue: { type: Schema.Types.Mixed },

    attachments:  {type: Schema.Types.Mixed},

    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Hold', 'Done'],
        required: true
    },

    createTime: {
        type: Schema.Types.Date,
        default: Date.now
    }

};

const Support = new Schema(SupportSchema);


Support.statics.addSupportRecord = function (name, restaurant, email, phone,  account, kind, item, category, issue, status, attachments) {

    let supportRecord = new this({
        author: {
            name: name || null
            , restaurant: restaurant || null
            , email: email || null
            , phone: phone || null
            , account: account || null
            , kind: kind || null
            , item: item || null
        }
        , category: category
        , issue: issue
        , status: status
        , attachments: attachments
    });

    supportRecord.markModified('attachments');

    supportRecord.save();

};

Support.statics.findByAuthorEmail = function (email) {

    return this.find({'author.email': email}).exec();
};

Support.statics.findByAuthorId = function (id) {

    return this.find({'author.item': id}).exec();
};

Support.statics.findById = function (id) {

    return this.findOne({ _id: id }).exec();
};


module.exports = mongoose.model('Support', Support);




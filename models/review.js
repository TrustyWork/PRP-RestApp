const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userModel = require('models/user');
//const restModel = require('models/rest'); //uncomment if restModel
const commentModel = require('models/comment');

const ReviewSchema = {
    // _id will be created by Mongo

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: { unique: false }
    },

    rest: {
        type: Schema.Types.ObjectId,
        ref: 'Rest',
        index: { unique: false }
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: { unique: false }
    },

    content: {type: Schema.Types.Mixed , required: true},

    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],

    likes: { type: Number },

    createTime: {
        type: Schema.Types.Date,
        default: Date.now
    }

};

const Review = new Schema(ReviewSchema);


Review.statics.addReviewRecord = function (user,
                                           //rest, //uncomment if restModel
                                           author,
                                           content) {

    let reviewRecord = new this({
        user: user
       // , rest: rest
        , author: author
        , content: content
        , comment: []

    });

    reviewRecord.markModified('content');

    reviewRecord.save();

    user.updateReviewRef(reviewRecord._id);
    //rest.updateReviewRef(reviewRecord._id); //uncomment if restModel

};

Review.methods.updateCommentRef = function (ref) {
    this.comment.push(ref);
    return this.save();
};

Review.statics.findByUser = function (user) {

    return this.find({ user: user }).exec();
};

Review.statics.findByRest = function (rest) {

    return this.find({ rest: rest }).exec();
};

Review.statics.findByAuthor = function (author) {

    return this.find({ author: author }).exec();
};

Review.statics.findById = function (id) {

    return this.findOne({ _id: id }).exec();
};


module.exports = mongoose.model('Review', Review);



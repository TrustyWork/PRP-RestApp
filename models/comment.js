const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userModel = require('models/user');
//const restModel = require('models/rest'); //uncomment if restModel
const reviewModel = require('models/review');

const CommentSchema = {
    // _id will be created by Mongo

    review: {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        index: { unique: false }
    },

    author: {
        kind: String,
        item: { type: Schema.Types.ObjectId, refPath: 'author.kind' },
        index: { unique: false }
    },

    content: {type: String, required: true},

    createTime: {
        type: Schema.Types.Date,
        default: Date.now
    }

};

const Comment = new Schema(CommentSchema);


Comment.statics.addCommentRecord = function ( review, kind, item, content ) {

    let commentRecord = new this({

        review: review
        , author: {
            kind: kind,
            item: item
        }
        , content: content

    });

    commentRecord.save();
    review.updateCommentRef(commentRecord._id);
};

Comment.statics.findByAuthor = function (author) {

    return this.find({ author: author }).exec();
};

Comment.statics.findById = function (id) {

    return this.findOne({ _id: id }).exec();
};



module.exports = mongoose.model('Comment', Comment);


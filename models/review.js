const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userModel = require('models/user');
//const restModel = require('models/rest'); //uncomment if restModel


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

    content: {
        type: String, max: 255, required: true
    },

    createTime: {
        type: Schema.Types.Date,
        default: Date.now
    }

};

const Review = new Schema(ReviewSchema);



Review.statics.addReviewRecord = function (user,
                                           //rest, //uncomment if restModel
                                           content) {

    let reviewRecord = new this({
        user: user._id
       // , rest: rest._id
        , content: content

    })

    reviewRecord.save().then(function (doc) {
        if (err) {
            console.log(new Error('Can"t create user:', err))}
         console.log(doc);
    });

    user.updateReviewRef(reviewRecord._id);
    //rest.updateReviewRef(reviewRecord._id); //uncomment if restModel

};


Review.statics.findByUser = function (user) {
    return this.findOne({ user: user.username }).exec();
}

Review.statics.findByRest = function (rest) {
    return this.findOne({ rest: rest.name }).exec();
}



module.exports = mongoose.model('Review', Review);


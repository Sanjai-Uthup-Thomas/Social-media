const mongoose = require('mongoose')

const Comment = new mongoose.Schema({
    userId:{
        type:  mongoose.Types.ObjectId,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    postId:{
        type:  mongoose.Types.ObjectId,
        required: true
    },
    Status: {
        type: Boolean,
        default: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})
module.exports = mongoose.model('Comment', Comment)
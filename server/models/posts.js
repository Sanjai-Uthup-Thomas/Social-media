const mongoose = require('mongoose')

const Posts = new mongoose.Schema({
    userId:{
        type:  mongoose.Types.ObjectId,
        required: true
    },
    description: {
        type: String,
        required: true
    },
     tags: {
        type:Array
    },
    postImage: {
        type: String,
        required: true
    },
    Status: {
        type: Boolean,
        default: true,
    },
    Likes:{
        type:Array
    },
    Bookmarks:{
        type:Array
    },
    Reports:{
        type:Array
    },
    date: {
        type: Date,
        default: Date.now,
    }
})
module.exports = mongoose.model('Posts', Posts)
const mongoose = require('mongoose')

const Posts = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    Image: {
        type: String,
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
module.exports = mongoose.model('Posts', Posts)
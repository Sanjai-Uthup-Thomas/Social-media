const mongoose = require('mongoose')

const Tags = new mongoose.Schema({
    tags:{
        type:String,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})
module.exports = mongoose.model('Tags', Tags)
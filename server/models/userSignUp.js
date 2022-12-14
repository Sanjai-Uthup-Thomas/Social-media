const mongoose = require('mongoose')

const signUpTemplate  = new mongoose.Schema({
    userName:{type:String,required:true},
    phoneNumber:{type:Number, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    Bio:{type:String},
    Status:{type:Boolean,default:true},
    profilePhoto:{type:String,default:'demo.jpg'},
    Followers:{type:Array},
    Following:{type:Array},
    reportStatus:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now}
})
module.exports= mongoose.model('user',signUpTemplate)

//username,phonenumber,email,password
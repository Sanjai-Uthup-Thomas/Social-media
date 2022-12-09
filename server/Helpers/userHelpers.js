const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config({ path: './var/.env' })
const userSchema= require('../models/userSignUp')
const postSchema = require('../models/posts');
const commentSchema = require('../models/comments');
const { json } = require('express');
let ObjectId = mongoose.Types.ObjectId


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.OTP_MAIL, // generated ethereal user
        pass: process.env.OTP_PASSWORD, // generated ethereal password
    },
});
module.exports = {

    OTPgenerator: () => {
        try {
            const otpLength = 4
            let otp = ""
            for (let i = 0; i < otpLength; i++) {
                otp += Math.floor(Math.random() * 9)
            }
            return otp
        } catch (error) {
            res.json({
                status: "Failed",
                message: error.message,
            })
        }

    },
    sentOTPverificationmail: (email, otp) => {
        try {
            const mailOptions = {
                form: 'socialmedia@gmail.com',
                to: email,
                subject: "verify your email",
                html: `<p>Enter <b> ${otp}  </b> in the app to verify your email address</p>`
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("errr");
                    console.log(error);
                } else {
                    console.log("Verification otp mail sent");
                    console.log(info.response);
                    res.json({
                        status: "pending",
                        message: "Verification otp mail sent",
                        mail: email,

                    })
                }
            });
        } catch (error) {
            res.json({
                status: "Failed",
                message: error.message,
            })
        }
    },
    Posts: (Data, UserId) => {
        try {
            const { description, postImage } = Data
            const post = new postSchema({
                userId: UserId,
                description: description,
                postImage: postImage,

            })
            post.save()


        } catch (error) {
            return error.message
        }


    },
    listPosts: async () => {
        try {
            const posts = await postSchema.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: "user"
                    }
                }, {
                    $unwind: '$user'
                }, {
                    $project: { 
                        userId: '$userId',
                        postImage: '$postImage',
                        userName: '$user.userName',
                        date: '$date',
                        description: '$description',
                        Likes: '$Likes',
                        DP:'$user.profilePhoto'
                    }
                }, {
                    $sort: { 'date': -1 }
                }
            ])
            console.log(posts);
            return posts
        } catch (error) {
            return error.message
        }
    },

    doLikePost: async(postId, userId) => {

        try {
            const like = await postSchema.findByIdAndUpdate(postId, {
                $push: {Likes:userId }
            })
            return json({msg:"sucessfully"})

        } catch (error) {
            return error.message
        }
    },
    doUnLikePost: async(postId, userId) => {

        try {
            const unlike = await postSchema.findByIdAndUpdate(postId, {
                $pull: {Likes:userId }
            })
            return json({msg:"sucessfully"})

        } catch (error) {
            return error.message
        }
    },
    docommentPost:(postId,userId,comment)=>{
        try{
           const comments = new commentSchema({
            userId: userId,
            comment: comment,
            postId: postId, 
            })
            comments.save()
            return json({msg:"sucessfully"})
        } catch (error) {
            return error.message
        }
    },
    getCommentPosts:async(postId)=>{
        try{
            let comments=await commentSchema.aggregate([
                {
                    $match: { postId: ObjectId(postId) }
                },{
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: "user"
                    }
                }, {
                    $unwind: '$user'
                }, {
                    $project: {
                        userId: '$userId',
                        userName: '$user.userName',
                        date: '$date',
                        comment: '$comment',
                        DP: '$user.profilePhoto'
                    }
                }
            ])
            return comments;

        }catch (error) {
            return error.message
        }
    },
    getPost:async(postId)=>{
        try{
            let post=await postSchema.aggregate([
                {
                    $match: { _id: ObjectId(postId) }
                },{
                    $project:{
                        image:'$postImage'
                    }
                }
            ])
            return post;

        }catch (error) {
            return error.message
        }
    },
    getUserNames:async()=>{
        try{
            let usernames=await userSchema.aggregate([
                {
                    $project:{
                        userName:'$userName'
                    }
                }
            ])
            return usernames
        }catch (error) {
            return error.message
        }
    },
    getUserHead:async(userId)=>{
        try{
            let userHead=await userSchema.aggregate([
                {
                    $match: { _id: ObjectId(userId) }
                },
                {
                    $lookup: {
                        from: 'posts',
                        localField: '_id',
                        foreignField: 'userId',
                        as: "posts"
                    }
                },{
                    $project:{
                        userName:'$userName',
                        postNumbers: { $cond: { if: { $isArray: "$posts"}, then: { $size: "$posts" }, else: 0} },
                        DP:'$profilePhoto',
                        Bio:'$Bio'
                    }
                }
            ])
            return userHead
        }catch (error) {
            return error.message
        }
    },
    getUserPosts:async(userId)=>{
        try{
            console.log(userId);
            let userHead=await postSchema.aggregate([
                {
                    $match: { userId: ObjectId(userId) }
                }
               ,{
                    $project:{
                     postImages:'$postImage'
                    }
                }
            ])
            console.log(userHead);
            return userHead

        }catch (error) {
            return error.message
        }
    },
    getUserProfileForEdit:async(userId)=>{
        try{
            console.log(userId);
            let userDetails=await userSchema.findById(userId)
            console.log(userDetails);
            return userDetails
        }catch (error) {
            return error.message
        }
       

    },
    doUserProfileEdit:async(userId,data)=>{
        try{   
            let user = await userSchema.findOne({ _id:userId })
            let email = await userSchema.findOne({ email: data.email })
            let userName = await userSchema.findOne({ userName: data.userName })
            let phoneNumber = await userSchema.findOne({ phoneNumber: data.phoneNumber })
            if (email && user.email != data.email) {
                 return ({ message: "Email Id already in use" })
            } else if (userName && user.userName != data.userName) {
                return ({ message: "User Name already in use" })
            }else if (phoneNumber && user.phoneNumber != data.phoneNumber) {
                return ({ message: "Phone Number already in use" })
            }
            else {
                await userSchema.updateOne({ _id:userId }, {
                    $set: {
                        userName: data.userName,
                        phoneNumber: data.phoneNumber,
                        email: data.email,
                        Bio: data.bio
                    }
                })
                return ({ message: "success", status: true })
            }
        }catch (error) {
            return error.message
        }
       
    },
    changeDp:async(userId,photo)=>{
        try{
            await userSchema.updateOne({ _id:userId }, {
                $set: {
                    profilePhoto:photo
                }
            })
            return ({ message: "success", status: true })

        }catch (error) {
            return error.message
        }
    }


}
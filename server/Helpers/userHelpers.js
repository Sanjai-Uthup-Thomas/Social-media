const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config({ path: './var/.env' })
const postSchema = require('../models/posts');
const { json } = require('express');


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
            console.log("data", Data);
            console.log("userid", UserId);
            const { description, postImage } = Data
            console.log(description, postImage);
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
            console.log("hsaaiia");
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
                        Likes: '$Likes'
                    }
                }, {
                    $sort: { 'date': -1 }
                }
            ])
            console.log("lkjhgf");
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
            console.log(like);
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
            console.log(unlike);
            return json({msg:"sucessfully"})

        } catch (error) {
            return error.message
        }
    }

}
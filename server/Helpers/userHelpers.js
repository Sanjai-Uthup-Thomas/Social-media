const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()
const userSchema = require('../models/userSignUp')
const postSchema = require('../models/posts');
const commentSchema = require('../models/comments');
const tagsSchema = require('../models/tags');
const notificationSchema = require('../models/notifications')
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
    findUser: async (data) => {
        try {
            const User = await userSchema.findOne(
                {
                    $or: [
                        { userName: data },
                        { email: data },
                        { phoneNumber: data }
                    ]
                }
            )
            if (User) {
                return User
            } else {
                return { error: "No such user" }
            }

        } catch (error) {
            return error.message
        }
    },
    encryptedOTPintoDB: async (UID, otp) => {
        try {
            await userSchema.findByIdAndUpdate(UID, {
                $set: { otp: otp }
            })
            return { msg: "sucessfully", _id: UID }

        } catch (error) {
            return error.message
        }
    },
    checkBlock: async (userId) => {
        try {
            const userBlock = await userSchema.findById(userId)
            return userBlock
        } catch (error) {
            return error.message
        }
    },
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
                } else {
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
            const array = []
            const { description, postImage, Location } = Data
            const tags = description.match(/#\w+/g)
            //tags=[#happy,#2]=>[id[#happy], id[#2]]
            const Tags = tags.map(async (tag) => {
                const value = await tagsSchema.findOne({ tags: tag })
                if (!value) {
                    const newTag = new tagsSchema({
                        tags: tag,
                    })
                    newTag.save().then(async () => {
                        console.log("new tag saved", newTag);
                        await postSchema.findByIdAndUpdate(post?._id, {
                            $push: { tags: newTag._id }
                        })
                    })
                } else {
                    await postSchema.findByIdAndUpdate(post?._id, {
                        $push: { tags: value._id }
                    })
                }
            })
            const post = new postSchema({
                userId: UserId,
                description: description,
                postImage: postImage,
                Location: Location,
                tags: array

            })
            post.save()
        } catch (error) {
            return error.message
        }
    },
    listPosts: async (userId) => {
        try {
            const posts = await userSchema.aggregate([
                {
                    $match: {
                        _id: ObjectId(userId),
                    }
                },
                {
                    $unwind: '$Following'
                },
                {
                    $addFields: {
                        "userId": {
                            "$toObjectId": "$Following"
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'posts',
                        localField: 'userId',
                        foreignField: 'userId',
                        as: 'posts'
                    }
                },
                {
                    $unwind: '$posts'
                }
                ,
                {
                    $lookup: {
                        from: 'users',
                        localField: 'posts.userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                },
                {
                    $lookup: {
                        from: 'comments',
                        localField: 'posts._id',
                        foreignField: 'postId',
                        as: 'comments'
                    }
                }
                ,
                {
                    $project: {
                        userId: '$user._id',
                        postId: '$posts._id',
                        postImage: '$posts.postImage',
                        Status: '$posts.Status',
                        reportStatus: '$user.reportStatus',
                        userName: '$user.userName',
                        date: '$posts.date',
                        Location: '$posts.Location',
                        description: '$posts.description',
                        Likes: '$posts.Likes',
                        Comments: '$comments',
                        DP: '$user.profilePhoto',
                        Bookmarks: '$posts.Bookmarks',
                        Reports: '$posts.Reports'
                    }
                },
                {
                    $match: {
                        Status: { $ne: false },
                        reportStatus: { $ne: true }
                    }
                },
                // {
                //     $unwind:'$Reports'
                // },
                {
                    $project: {
                        userId: '$userId',
                        postId: '$postId',
                        postImage: '$postImage',
                        userName: '$userName',
                        date: '$date',
                        Location: '$Location',
                        description: '$description',
                        Likes: '$Likes',
                        Comments: '$Comments',
                        DP: '$DP',
                        Bookmarks: '$Bookmarks',
                        Reports: '$Reports.UserId'
                    }
                },
                {
                    $sort: { 'date': -1 }
                }
            ])
            return posts
        } catch (error) {
            return error.message
        }
    },
    tagedPosts: async (TID) => {
        try {
            const posts = await postSchema.aggregate([
                {
                    $match: {
                        tags: {
                            $in: [ObjectId(TID)]
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                },
                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'postId',
                        as: 'comments'
                    }
                },
                {
                    $project: {
                        userId: '$user._id',
                        postId: '$_id',
                        postImage: '$postImage',
                        Status: '$Status',
                        reportStatus: '$user.reportStatus',
                        userName: '$user.userName',
                        date: '$date',
                        Location: '$Location',
                        description: '$description',
                        Likes: '$Likes',
                        Comments: '$comments',
                        DP: '$user.profilePhoto',
                        Bookmarks: '$Bookmarks',
                        Reports: '$Reports'
                    }
                },
                {
                    $match: {
                        Status: { $ne: false },
                        reportStatus: { $ne: true }
                    }
                },
                {
                    $sort: { 'date': -1 }
                }
            ])
            return posts;
        } catch (error) {
            return error.message
        }
    },
    latestPosts: async () => {
        try {
            const posts = await postSchema.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: "user"
                    }
                },
                {
                    $unwind: '$user'
                },
                {
                    $project: {
                        userId: '$userId',
                        postId: '$postId',
                        postImage: '$postImage',
                        userName: '$user.userName',
                        reportStatus: '$user.reportStatus',
                        Status: '$user.Status',
                        date: '$date',
                        description: '$description',
                        Location: '$Location',
                        DP: '$user.profilePhoto',
                    }
                },
                {
                    $match: {
                        Status: { $ne: false },
                        reportStatus: { $ne: true }
                    }
                },
                {
                    $sort: { 'date': -1 }
                }, {
                    $limit: 1
                }
            ])
            return posts
        } catch (error) {
            return error.message
        }
    },
    doLikePost: async (postId, userId) => {
        try {
            const like = await postSchema.findByIdAndUpdate(postId, {
                $push: { Likes: userId }
            })
            return json({ msg: "sucessfully" })
        } catch (error) {
            return error.message
        }
    },
    doUnLikePost: async (postId, userId) => {
        try {
            const unlike = await postSchema.findByIdAndUpdate(postId, {
                $pull: { Likes: userId }
            })
            return json({ msg: "sucessfully" })
        } catch (error) {
            return error.message
        }
    },
    docommentPost: (postId, userId, comment) => {
        try {
            const comments = new commentSchema({
                userId: userId,
                comment: comment,
                postId: postId,
            })
            comments.save()
            return json({ msg: "sucessfully" })
        } catch (error) {
            return error.message
        }
    },
    getCommentPosts: async (postId) => {
        try {
            let comments = await commentSchema.aggregate([
                {
                    $match: { postId: ObjectId(postId) }
                }, {
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

        } catch (error) {
            return error.message
        }
    },
    getPost: async (postId) => {
        try {
            let post = await postSchema.aggregate([
                {
                    $match: { _id: ObjectId(postId) }
                }, {
                    $project: {
                        image: '$postImage'
                    }
                }
            ])
            return post;
        } catch (error) {
            return error.message
        }
    },
    getUserNames: async () => {
        try {
            let usernames = await userSchema.aggregate([
                {
                    $project: {
                        userName: '$userName'
                    }
                }
            ])
            return usernames
        } catch (error) {
            return error.message
        }
    },
    getUserHead: async (userId) => {
        try {
            let userHead = await userSchema.aggregate([
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
                }, {
                    $project: {
                        userName: '$userName',
                        postNumbers: { $cond: { if: { $isArray: "$posts" }, then: { $size: "$posts" }, else: 0 } },
                        DP: '$profilePhoto',
                        Bio: '$Bio',
                        reportStatus: '$reportStatus',
                        Followers: '$Followers',
                        Following: '$Following',
                    }
                }
            ])
            return userHead
        } catch (error) {
            return error.message
        }
    },
    getUserPosts: async (userId) => {
        try {
            let userHead = await postSchema.aggregate([
                {
                    $match: { userId: ObjectId(userId) }
                }
                , {
                    $project: {
                        postImages: '$postImage',
                        userId: '$userId'
                    }
                }
            ])
            return userHead
        } catch (error) {
            return error.message
        }
    },
    getUserProfileForEdit: async (userId) => {
        try {
            let userDetails = await userSchema.findById(userId)
            return userDetails
        } catch (error) {
            return error.message
        }
    },
    doUserProfileEdit: async (userId, data) => {
        try {
            let user = await userSchema.findOne({ _id: userId })
            let email = await userSchema.findOne({ email: data.email })
            let userName = await userSchema.findOne({ userName: data.userName })
            let phoneNumber = await userSchema.findOne({ phoneNumber: data.phoneNumber })
            if (email && user.email != data.email) {
                return ({ message: "Email Id already in use" })
            } else if (userName && user.userName != data.userName) {
                return ({ message: "User Name already in use" })
            } else if (phoneNumber && user.phoneNumber != data.phoneNumber) {
                return ({ message: "Phone Number already in use" })
            }
            else {
                await userSchema.updateOne({ _id: userId }, {
                    $set: {
                        userName: data.userName,
                        phoneNumber: data.phoneNumber,
                        email: data.email,
                        Bio: data.bio
                    }
                })
                const result = await userSchema.findById(userId)
                return ({ message: "success", status: true, data: { id: result._id, username: result.userName, profilePhoto: result.profilePhoto } })
            }
        } catch (error) {
            return error.message
        }
    },
    changeDp: async (userId, photo) => {
        try {
            await userSchema.updateOne({ _id: userId }, {
                $set: {
                    profilePhoto: photo
                }
            })
            const result = await userSchema.findById(userId)
            return ({ message: "success", status: true, data: { id: result._id, username: result.userName, profilePhoto: result.profilePhoto } })
        } catch (error) {
            return error.message
        }
    },
    doChangePassword: async (UID, password) => {
        try {
            await userSchema.findByIdAndUpdate(UID, {
                $set: { password: password }
            })
            return ({ message: "success", status: true })

        } catch (error) {
            return error.message
        }
    },
    doBookPost: async (postId, userId) => {
        try {
            await postSchema.findByIdAndUpdate(postId, {
                $push: { Bookmarks: userId }
            })
            return json({ msg: "sucessfully" })
        } catch (error) {
            return error.message
        }

    },
    doUnBookPost: async (postId, userId) => {
        try {
            await postSchema.findByIdAndUpdate(postId, {
                $pull: { Bookmarks: userId }
            })
            return json({ msg: "sucessfully" })
        } catch (error) {
            return error.message
        }
    },
    getSavedPosts: async (userId) => {
        try {
            let userHead = await postSchema.aggregate([
                {
                    $match: { Bookmarks: userId }
                }, {
                    $project: {
                        postImages: '$postImage',
                        userId: '$userId'
                    }
                }
            ])
            return userHead
        } catch (error) {
            return error.message
        }
    },
    userSearch: async (data) => {
        try {
            let result = await userSchema.aggregate([
                {
                    $match: {
                        userName: { $regex: new RegExp(data, 'i') }
                    }
                }, {
                    $project: {
                        userName: '$userName',
                        userDp: '$profilePhoto',
                        userId: '$_Id',
                    }
                }
            ])
            return result
        } catch (error) {
            return error.message
        }
    },
    userFollow: async (userId, friendId) => {
        try {
            await userSchema.findByIdAndUpdate(userId, { $push: { Following: friendId } })
            await userSchema.findByIdAndUpdate(friendId, { $push: { Followers: userId } })
            return json({ msg: "sucessfully" })
        } catch (error) {
            return error.message
        }
    },
    userUnfollow: async (userId, friendId) => {
        try {
            await userSchema.findByIdAndUpdate(userId, { $pull: { Following: friendId } })
            await userSchema.findByIdAndUpdate(friendId, { $pull: { Followers: userId } })
            return json({ msg: "sucessfully" })
        } catch (error) {
            return error.message
        }
    },
    doSuggestions: async (userId) => {
        try {
            const result = await userSchema.aggregate([
                {
                    $match: { _id: { $ne: ObjectId(userId) } }
                },
                {
                    $match: { 'Followers': { $nin: [userId] } }
                },
                {
                    $sample: { size: 20 }
                }
            ])
            return result
        } catch (error) {
            return error.message
        }
    },
    deletePost: async (data) => {
        try {
            await postSchema.findByIdAndDelete(ObjectId(data))
            return json({ msg: "sucessfully" })
        } catch (error) {
            return error.message
        }
    },
    reportPost: async (user, data) => {
        try {
            const postId = new ObjectId(data.postId)
            const result = await postSchema.findByIdAndUpdate(postId, {
                $push: { Reports: { Reason: data.reason, UserId: user } }
            })
            return json({ msg: "sucessfully" })
        } catch (error) {
            return error.message
        }
    },
    followers: async (userId) => {
        const user = await userSchema.findById(userId);
        const Followers = await Promise.all(
            user.Followers.map((id) => userSchema.findById(id))
        )
        const formattedFollowers = Followers.map(
            ({ _id, userName, profilePhoto }) => {
                return { _id, userName, profilePhoto };
            }
        )
        return formattedFollowers
    },
    following: async (userId) => {
        const user = await userSchema.findById(userId);
        const Following = await Promise.all(
            user.Following.map((id) => userSchema.findById(id))
        )

        const formattedFollowing = Following.map(
            ({ _id, userName, profilePhoto, Followers, Following }) => {
                return { _id, userName, profilePhoto, Followers, Following };
            }
        )
        return formattedFollowing
    },
    addNotifications: async (data) => {
        try {
            const { receiverId, senderId, postId, type } = data
            const res = await notificationSchema.findOne({
                triggered_by: senderId,
                notify: receiverId,
                postId: postId,
                notification: type
            })
            if (!res) {
                const notifications = new notificationSchema({
                    triggered_by: senderId,
                    notify: receiverId,
                    postId: postId,
                    notification: type
                })
                notifications.save()
            } else {
                await notificationSchema.findByIdAndUpdate(ObjectId(res._id), {
                    notification: type
                })
            }
            return { msg: "sucessfully" }
        } catch (error) {
            return error.message
        }
    },
    getUserNotifications: async (UID) => {
        try {
            const notifications = await notificationSchema.aggregate([
                {
                    $match: {
                        notify: ObjectId(UID)
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'triggered_by',
                        foreignField: '_id',
                        as: "triggeredUser"
                    }
                }, {
                    $unwind: '$triggeredUser'
                }, {
                    $project: {
                        userName: '$triggeredUser.userName',
                        userDp: '$triggeredUser.profilePhoto',
                        time: '$createdAt',
                        type: '$notification',
                        read: '$read',
                    }
                }, {
                    $sort: { 'time': -1 }
                }
            ])
            return notifications
        } catch (error) {
            return error.message
        }
    },
    doNotifications: async (NID) => {
        try {
            const notification = await notificationSchema.findByIdAndUpdate(NID, {
                $set: {
                    read: true,
                }
            })
            return { msg: "sucessfully" }
        } catch (error) {
            return error.message
        }
    },
    getUserNotificationsCount: async (UID) => {
        try {
            const notifications = await notificationSchema.aggregate([
                {
                    $match: {
                        notify: ObjectId(UID),
                        read: false
                    }
                }
            ])
            return notifications
        } catch (error) {
            return error.message
        }
    },
    getAllTags: async (data) => {
        try {
            const result = await tagsSchema.aggregate([
                {
                    $match: {
                        tags: { $regex: new RegExp(data, 'i') }
                    }
                }
                , {
                    $project: {
                        HashTag: '$tags',
                    }
                },
                { $limit: 5 }

            ])
            return result
        } catch (error) {
            return error.message
        }
    },
    TopTenTags: async () => {
        try {
            const result = await postSchema.aggregate([
                {
                    $unwind: '$tags'
                },
                {
                    $group: {
                        _id: '$tags',
                        tag: { $first: '$_id' },
                        count: { $sum: 1 }
                    }
                },
                {
                    $lookup: {
                        from: 'tags',
                        localField: '_id',
                        foreignField: '_id',
                        as: "tags"
                    }
                },
                {
                    $project: {
                        _id: '$tags.tags',
                        tag: '$_id',
                        count: '$count'
                    }
                },
                {
                    $sort: { 'count': -1 }
                }, {
                    $limit: 10
                }
            ])
            console.log(result);
            return result

        } catch (error) {
            return error.message
        }
    },
    doDeactiveAccount: async (UID) => {
        try {
            const result = await userSchema.findByIdAndUpdate(UID,
                {
                    $set: {
                        reportStatus: true,
                    }
                })
            return result
        } catch (error) {
            return error.message
        }
    }
}

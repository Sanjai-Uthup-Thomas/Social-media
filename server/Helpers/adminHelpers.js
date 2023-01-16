const mongoose = require('mongoose')
const userSignUp = require('../models/userSignUp')
const postSchema = require('../models/posts')
let ObjectId = mongoose.Types.ObjectId

module.exports = {
    users: async () => {
        try {
            const res = await userSignUp.find()
            return res
        } catch (error) {
            console.log(error);
            return ({
                status: "Failed",
                message: error.message,
            })
        }

    },
    blockUser: async (id) => {
        try {
            const res = await userSignUp.findByIdAndUpdate(id, [{ "$set": { Status: { "$not": "$Status" } } }])
            return res
        } catch (error) {
            return ({
                status: "Failed",
                message: error.message,
            })
        }

    },
    PostsList: async () => {
        try {
            const posts = await postSchema.aggregate([
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
                    $project: {
                        userId: '$_id',
                        postId: '$postId',
                        postImage: '$postImage',
                        Status: '$Status',
                        userName: '$user.userName',
                        date: '$date',
                        description: '$description',
                        Reports: '$Reports.UserId'
                    }
                },
                {
                    $sort: { 'date': -1 }
                }
            ])
            return posts
        } catch (error) {
            return ({
                status: "Failed",
                message: error.message,
            })
        }
    },
    blockPost: async (postId) => {
        try {
            const res = await postSchema.findByIdAndUpdate(postId, [{ "$set": { Status: { "$not": "$Status" } } }])
            return res
        } catch (error) {
            return ({
                status: "Failed",
                message: error.message,
            })
        }
    },
    ReportedUsers: async (postId) => {
        try {
            const posts = await postSchema.aggregate([
                {
                    $match: { _id: ObjectId(postId) }
                },
                {
                    $unwind: '$Reports'
                }
                , {
                    $project: {
                        Reason: '$Reports.Reason',
                        userId: '$Reports.UserId',
                    }
                },
                {
                    $addFields: {
                        "userId": {
                            "$toObjectId": "$userId"
                        }
                    }
                }
                , {
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
                        userName: '$user.userName',
                        userDP: '$user.profilePhoto',
                        reason: '$Reason'
                    }
                }
            ])
            return posts
        } catch (error) {
            return ({
                status: "Failed",
                message: error.message,
            })
        }

    }
}
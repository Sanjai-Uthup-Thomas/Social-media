const mongoose = require('mongoose')
const userSignUp = require('../models/userSignUp')
const Message = require('../models/message')
const chat = require('../models/chat')

let ObjectId = mongoose.Types.ObjectId

module.exports = {

    addMessages: async (data) => {
        const newMessage = new Message(data)
        try {
            const savedMessage = await newMessage.save()
            await chat.findByIdAndUpdate(savedMessage.chat, {
                latestMessage: savedMessage._id
            })
            const result = await Message.aggregate([
                {
                    $match: { _id: ObjectId(newMessage._id) }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'sender',
                        foreignField: '_id',
                        as: "user"
                    }
                }, {
                    $unwind: '$user'
                }, {
                    $project: {
                        _id:'$_id',
                        UID: '$user._id',
                        userName: '$user.userName',
                        userDP: '$user.profilePhoto',
                        content: '$content',
                        time: '$createdAt'
                    }
                }
            ])
            return result
        } catch (err) {
            return err
        }
    },
    getMessages: async (chatId) => {
        try {
            const message = await Message.find({
                chat: chatId,
            })
            const result = await Message.aggregate([
                {
                    $match: { chat: ObjectId(chatId) }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'sender',
                        foreignField: '_id',
                        as: "user"
                    }
                }, {
                    $unwind: '$user'
                }, {
                    $project: {
                        UID: '$user._id',
                        userName: '$user.userName',
                        userDP: '$user.profilePhoto',
                        content: '$content',
                        time: '$createdAt'
                    }
                }
            ])
            return result
        } catch (err) {
            return err
        }
    }

}
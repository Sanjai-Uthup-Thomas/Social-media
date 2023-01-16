const mongoose = require('mongoose')
const userSchema = require('../models/userSignUp')
const chat = require('../models/chat')
let ObjectId = mongoose.Types.ObjectId

module.exports = {
    getAllChats:async(UID)=>{
        try{
            const conversation = await chat.find({
                users:{$in:[UID]}
            }) 
            const result = await chat.aggregate([
                {
                    $match:{users:{$in:[ObjectId(UID)]}}
                },
                {
                    $addFields: {
                        "user":
                             "$users"
                    }
                }
                ,{
                    $unwind:'$user'
                },
                {
                    $match:{user:{$ne:ObjectId(UID)}}
                },{
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: "userz"
                    }
                },{
                    $unwind:'$userz'
                },{
                    $lookup: {
                        from: 'messages',
                        localField: 'latestMessage',
                        foreignField: '_id',
                        as: "latestMessage"
                    }
                },{
                    $unwind:'$latestMessage'
                }
                ,
                {
                    $project:{
                        time:'$updatedAt',
                        latestMessage:'$latestMessage.content',
                        userName:'$userz.userName',
                        profilePhoto:'$userz.profilePhoto',
                        users:'$users'
                    }
                },
                { $sort : { time : -1 } }
            ])
            return result
        }catch(err){
            return err
        }

    },
    startChat:async(UID,FID)=>{
        const chats = await chat.findOne({
            users:{$all:[UID,FID]}
        })
        if(!chats){
            const newChat= new chat({
                users:[UID,FID],
            })
            try{
                const savedChat=await newChat.save()
                return savedChat
            }
            catch(err){
                return err
            }
        }else{
            const result = await chat.aggregate([
                {
                    $match:{users:{$all:[ObjectId(FID),ObjectId(UID)]}}
                },
                {
                    $addFields: {
                        "user":
                             "$users"
                    }
                }
                ,{
                    $unwind:'$user'
                },
                {
                    $match:{user:{$ne:ObjectId(UID)}}
                }
                ,{
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: "userz"
                    }
                },{
                    $unwind:'$userz'
                }
                ,
                {
                    $project:{
                        time:'$updatedAt',
                        userName:'$userz.userName',
                        profilePhoto:'$userz.profilePhoto',
                        users:'$users',
                        _id: {
                            $toString: "$_id"
                          }
                    }
                }
               
            ])
            return result[0]
        }

    },
    getChatList:async(CID,UID)=>{
        try{
            const chatList = await chat.aggregate([
                {
                    $match:{_id:ObjectId(CID)}
                }
                ,
                {
                    $unwind:'$users'
                }
                ,
                {
                    $match:{users:{$ne:ObjectId(UID)}}
                }
                ,
                {
                    $lookup: {
                        from: 'users',
                        localField: 'users',
                        foreignField: '_id',
                        as: "user"
                    }
                }
                ,
                {
                    $lookup: {
                        from: 'messages',
                        localField: 'latestMessage',
                        foreignField: '_id',
                        as: "latestMessage"
                    }
                }
                ,
                {
                    $unwind: 
                    '$user',        
                }
                ,
                {
                    $unwind: 
                    '$latestMessage'
                        
                }
                ,
                {
                    $project:{
                        userName:'$user.userName',
                        userDP:'$user.profilePhoto',
                        latestMessage:'$latestMessage.content',
                        time:'$updatedAt'
                    }
                }               
            ])
            return chatList
        } catch(err){
            return err
        }
    },
    userSearch:async(data,user)=>{
        try {
            const result = await userSchema.aggregate([
                {
                    $match: {
                        _id:{$ne:ObjectId(user)},
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
    }
}
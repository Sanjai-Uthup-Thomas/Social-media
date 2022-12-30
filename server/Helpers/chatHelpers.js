const mongoose = require('mongoose')
const userSchema = require('../models/userSignUp')
const chat = require('../models/chat')
let ObjectId = mongoose.Types.ObjectId

module.exports = {
    getAllChats:async(UID)=>{
        // console.log("uid",UID);
        try{
            const conversation = await chat.find({
                users:{$in:[UID]}
            }) 
            // console.log("conversation",conversation);

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
            // console.log("result");
            // console.log(result);
            // console.log("result");
            return result
        }catch(err){
            return err
        }

    },
    startChat:async(UID,FID)=>{
        console.log("uid,fid",UID,FID);
        console.log("after user");
        const chats = await chat.findOne({
            users:{$all:[UID,FID]}
        })
        if(!chats){
            const newChat= new chat({
                users:[UID,FID],
            })
            try{
                const savedChat=await newChat.save()
                console.log("savedChat");

                console.log("savedChat",savedChat);

                return savedChat
            }
            catch(err){
                return err
            }
        }else{
            console.log("chat is already");
            console.log("chat",chats);
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
            console.log(result[0]);

            return result[0]
        }

    },
    getChatList:async(CID,UID)=>{
        // console.log("CID",CID);
        try{
            const chatList = await chat.aggregate([
                {
                    $match:{_id:ObjectId(CID)}
                },{
                    $unwind:'$users'
                },{
                    $match:{users:{$ne:ObjectId(UID)}}
                },{
                    $lookup: {
                        from: 'users',
                        localField: 'users',
                        foreignField: '_id',
                        as: "user"
                    }
                },{
                    $lookup: {
                        from: 'messages',
                        localField: 'latestMessage',
                        foreignField: '_id',
                        as: "latestMessage"
                    }
                },
                {
                    $unwind: 
                    '$user',        
                },
                {
                    $unwind: 
                    '$latestMessage'
                        
                }
                ,{
                    $project:{
                        userName:'$user.userName',
                        userDP:'$user.profilePhoto',
                        latestMessage:'$latestMessage.content',
                        time:'$updatedAt'
                    }
                },
               
            ])
            // console.log(chatList);
            return chatList;

        } catch(err){
            return err
        }
    },
    userSearch:async(data,user)=>{
        try {
            let result = await userSchema.aggregate([
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
            // console.log(result);
            // const users=await userSchema.find(result).find({_id:{$ne:ObjectId(user)}})
            // console.log(users);
            return result
        } catch (error) {
            return error.message
        }
    }
}
const chatHelper=require('../Helpers/chatHelpers')

module.exports = {
    getAllChats:(req,res)=>{
        try{
            console.log("user: " + req.user)
            chatHelper.getAllChats(req.user).then((response)=>{
                res.status(200).json(response)
            }).catch((error)=>{
                res.status(500).json(error)
             })
        }catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    createChat:async(req,res)=>{
        try{
            console.log("user: " + req.user)
            console.log("friend: " + req.params.id)
             chatHelper.startChat(req.user,req.params.id).then((response)=>{
                res.status(200).json(response)
             }).catch((error)=>{
                res.status(500).json(error)
             })
        }catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    chatList:(req,res)=>{
        try{
            console.log("chat: " + req.params.chatID)
            chatHelper.getChatList(req.params.chatID,req.user).then((response)=>{
                res.status(200).json(response)
             }).catch((error)=>{
                res.status(500).json(error)
             })
        }catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    searchList:async(req, res) => {
        try{
            await chatHelper.userSearch(req.params.data,req.user).then((response) => {
                res.json(response)
            })
        }catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }
}
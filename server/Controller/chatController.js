const chatHelper = require('../Helpers/chatHelpers')

module.exports = {
    getAllChats: async (req, res) => {
        try {
            const response = await chatHelper.getAllChats(req.user)
            res.status(200).json(response)

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    createChat: async (req, res) => {
        try {
            const response = await chatHelper.startChat(req.user, req.params.id)
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    chatList: async (req, res) => {
        try {
            const response = await chatHelper.getChatList(req.params.chatID, req.user)
            res.json(response)
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    searchList: async (req, res) => {
        try {
            const response = await chatHelper.userSearch(req.params.data, req.user)
            res.json(response)
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }
}
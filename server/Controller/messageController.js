const Helpers = require('../Helpers/messageHelpers')


module.exports = {
    createMessages: async (req, res) => {
        try {
            const response = await Helpers.addMessages(req.body)
            res.status(201).json(response)
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getAllMessages: async (req, res) => {
        try {
            const response = await Helpers.getMessages(req.params.chatId)
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }

}
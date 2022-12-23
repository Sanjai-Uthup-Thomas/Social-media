const Helpers = require('../Helpers/messageHelpers')


module.exports = {
    createMessages: (req, res) => {
        try {
            Helpers.addMessages(req.body).then((response)=>{
                res.status(200).json(response)
            }).catch((err) => {
                res.status(500).json({ msg: err.message })
            })
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getAllMessages: (req, res) => {
        try {
            console.log("params", req.params);
            Helpers.getMessages(req.params.chatId).then((response)=>{
                res.status(200).json(response)
            }).catch((err) => {
                res.status(500).json({ msg: err.message })
            })

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }

}
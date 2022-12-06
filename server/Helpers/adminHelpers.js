const userSignUp = require('../models/userSignUp')




module.exports = {

    users: async () => {
        try {
            const res = await userSignUp.find()
            return res
        } catch (error) {
            res.json({
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
            res.json({
                status: "Failed",
                message: error.message,
            })
        }

    }

}
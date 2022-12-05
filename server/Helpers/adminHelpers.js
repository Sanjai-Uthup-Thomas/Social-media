const userSignUp = require('../models/userSignUp')




module.exports = {

    users:async()=>{
        const res=await userSignUp.find()
        return res
    },
    blockUser:async(id)=>{
        const res=await userSignUp.findByIdAndUpdate(id,[{"$set": {Status: {"$not": "$Status"}}}])
        return res
    }

}
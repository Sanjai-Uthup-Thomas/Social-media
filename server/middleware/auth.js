const jwt = require('jsonwebtoken')
const userHelpers=require('.././Helpers/userHelpers')
const auth = async(req, res, next) => {
    try {
        const token = req.header("x-auth-token")
        // console.log(token, "token");
        if (!token)
            return res.status(401).json({ msg: "No authentication token, access denied" })
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified.id
        // console.log(`req.body ${req.body} ${req.user}`);

        if (!verified)
            return res.status(401).json({ msg: "Token verification failed, access denied" })
    const block=await userHelpers.checkBlock(req.user)
        if(!block){
            return res.status(401).json({ msg: "You are blocked, access denied" })
        }
        next()
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message }) 
    }
}
module.exports = auth
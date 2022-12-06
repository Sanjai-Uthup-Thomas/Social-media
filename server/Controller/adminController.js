const jwt = require('jsonwebtoken')
const adminSignUp = require('../models/AdminSignUp')
const bcrypt = require('bcrypt')
const adminHelpers=require('../Helpers/adminHelpers')
const { response } = require('express')

module.exports = {

    //adminSignup
    doSignup: async (req, res) => {
        try{
            const {email, password } = req.body
            const Email = await adminSignUp.findOne({ email: email })
            if (Email) {
                return res
                    .status(200)
                    .json({ msg: "Email is already in use" });
            }
            const saltPassword = await bcrypt.genSalt(10)
            const securePassword = await bcrypt.hash(password, saltPassword)
            const signedUpUser = new adminSignUp({
                email: email,
                password: securePassword
    
            })
            signedUpUser.save()
                .then(data => {
                    console.log(data);
                    res.json(data);
                })
                .catch(err => {
                    res.json(err);
                });
        }catch (err) {
            res.status(500).json({ msg: err.message });
        }
      
    },

    doLogin: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await adminSignUp.findOne({ email: email })
            if (!user)
                return res
                    .status(200)
                    .json({ msg: "No account found" });
            const isMatch = await bcrypt.compare(password, user.password);


            if (!isMatch) return res.status(200).json({ msg: "Invalid password" });
            const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET,
                { expiresIn: "3d" })
            console.log("token: " + token);

            res.json({
                token,
                user: {
                    id: user._id,
                    username: user.email,
                },
            });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getUsers: async (req, res) => {
        try {
            adminHelpers.users().then((response)=>{
                console.log(response);
                res.status(200).json(response)
            })
            

            }
            
         catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    doBlockUser:(req,res)=>{
        console.log(req.params.id);
        const id=req.params.id;
        try{
            adminHelpers.blockUser(id).then((response)=>{
                console.log(response);
                res.status(200).json(response)
            })

        }catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }
}
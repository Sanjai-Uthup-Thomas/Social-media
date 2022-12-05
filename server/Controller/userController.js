const jwt = require('jsonwebtoken')
const userSignUp = require('../models/userSignUp')
const bcrypt = require('bcrypt')
const userHelpers = require('../Helpers/userHelpers')
const { response } = require('express')

module.exports = {

    //userSignup
    doSignup: async (req, res) => {
        console.log(req.body);
        const { userName, phoneNumber, email, password } = req.body
        const UserName = await userSignUp.findOne({ userName: userName })
        if (UserName) {
            return res
                .status(200)
                .json({ msg: "Username is already in use" });
        }
        const Email = await userSignUp.findOne({ email: email })
        if (Email) {
            return res
                .status(200)
                .json({ msg: "Email is already in use" });
        }
        const Phone = await userSignUp.findOne({ phoneNumber: phoneNumber })
        if (Phone) {
            return res
                .status(200)
                .json({ msg: "Phone number is already in use" });
        }



        const otp = userHelpers.OTPgenerator()
        userHelpers.sentOTPverificationmail(email, otp)
        const saltPassword = await bcrypt.genSalt(10)
        const securePassword = await bcrypt.hash(password, saltPassword)
        const secureOTP = await bcrypt.hash(otp, saltPassword)
        const signedUpUser = {
            userName: userName,
            phoneNumber: phoneNumber,
            email: email,
            password: securePassword,
            otp: secureOTP

        }
        res.json(signedUpUser)


    },

    doOtpVerify: async (req, res) => {

        console.log(req.body);
        const { userName, phoneNumber, email, password, otp, OTP } = req.body
        const isMatch = await bcrypt.compare(OTP, otp);


        if (isMatch) {

            const signedUpUser = new userSignUp({
                userName: userName,
                phoneNumber: phoneNumber,
                email: email,
                password: password

            })
            signedUpUser.save()
                .then(data => {
                    console.log(data);
                    res.json(data);
                })
                .catch(err => {
                    res.json(err);
                });

        } else {
            res.json("error")
        }


    },

    doLogin: async (req, res) => {
        try {
            console.log(req.body);
            const { email, password } = req.body
            const user = await userSignUp.findOne({ email: email })
            console.log(user);
            if (!user){
                return res
                .status(200)
                .json({ msg: "No account found" });
            }
            const id=user.id
            console.log(id);
            const blockUser = await userSignUp.findById(id,{Status:true})
            if(!blockUser){
                return res
                .status(200)
                .json({msg:"Your account has been blocked"})
            }

            const isMatch = await bcrypt.compare(password, user.password);


            if (!isMatch) return res.status(200).json({ msg: "Invalid password" });
            const token = jwt.sign({ email: user.userName, id: user._id }, process.env.JWT_SECRET,
                { expiresIn: "3d" })
            console.log("token: " + token);

            res.json({
                token,
                user: {
                    id: user._id,
                    username: user.userName,
                },
            });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
        //check if token is valid
        doTokenIsValid: async (req, res) => {
            try {
                console.log("req.user", req.user);
                const token = req.header("x-auth-token")
                console.log(token,"usrcon 63");
                if (!token) return res.json(false)
                const verified = jwt.verify(token, process.env.JWT_SECRET)
                console.log(verified);
                if (!verified) return res.json(false)
                const user = await userSignUp.findById(verified.id)
                if (!user) return res.json(false)
                return res.json(true)
            } catch (err) {
                response.json({ error: err.message }) 
            }
      
        }, 
        doPost:(req,res)=>{
        req.body.postImage = req.file.filename 
            console.log(req.body)
            userHelpers.Posts(req.body)
            res.json(req.body)
        }
}
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
    //userLogin
    doLogin: async (req, res) => {
        try {
            console.log(req.body);
            const { email, password } = req.body
            const user = await userSignUp.findOne({ email: email })
            console.log(user);
            if (!user) {
                return res
                    .status(200)
                    .json({ msg: "No account found" });
            }
            const id = user.id
            console.log(id);
            const blockUser = await userSignUp.findById(id, { Status: true })
            if (!blockUser) {
                return res
                    .status(200)
                    .json({ msg: "Your account has been blocked" })
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
            console.log(token, "usrcon 63");
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
    doPost: async (req, res) => {
        req.body.postImage = req.file.filename
        await userHelpers.Posts(req.body, req.user)
        res.json(req.body)
    },
    getPost: (req, res) => {
        userHelpers.listPosts().then((response) => {
            res.json(response)
        })
    },
    doLikePost: (req, res) => {
        console.log(req.body.id);
        console.log(req.user);
        const postId = req.body.id
        const userId = req.user
        userHelpers.doLikePost(postId, userId).then((response) => {
            res.json(response)
        })
    },
    doUnLikePost: (req, res) => {
        const postId = req.body.id
        const userId = req.user
        userHelpers.doUnLikePost(postId, userId).then((response) => {
            res.json(response)
        })
    },
    doComment: (req, res) => {
        try {
            const { postId, comment } = req.body
            const userId = req.user
            userHelpers.docommentPost(postId, userId, comment).then((response) => {
                res.json(response)
            })
        } catch (err) {
            res.json({ error: err.message })
        }
    },
    getComment: async (req, res) => {
        try {
            await userHelpers.getCommentPosts(req.params.id).then((response) => {
                res.json(response)
            })


        } catch (err) {
            res.json({ error: err.message })
        }
    },
    getCommentPost: async (req, res) => {
        try {
            console.log("postId", req.params.id)
            await userHelpers.getPost(req.params.id).then((response) => {
                console.log(response);
                res.json(response)

            })
        } catch (err) {
            res.json({ error: err.message })
        }

    },
    doUserNames: async (req, res) => {
        try {
            await userHelpers.getUserNames().then((response) => {
                console.log("response", response);
                res.json(response)
            })
        } catch (err) {
            res.json({ error: err.message })
        }
    },
    doUserHead: async (req, res) => {
        try {
            console.log(req.params.id);
            await userHelpers.getUserHead(req.params.id).then((response) => {

                res.json(response)
            })
        } catch (err) {
            res.json({ error: err.message })
        }
    },
    doUserPosts: async (req, res) => {
        try {
            console.log(req.params.id);
            await userHelpers.getUserPosts(req.params.id).then((response) => {
                console.log(response);
                res.json(response)
            })
        } catch (err) {
            res.json({ error: err.message })
        }
    },
    getUserProfileForEdit: async (req, res) => {
        try {
            console.log(req.params.id);
            await userHelpers.getUserProfileForEdit(req.params.id).then((response) => {
                console.log(response);
                res.json(response)
            })
        } catch (err) {
            res.json({ error: err.message })
        }
    },
    doEditProfile: (req, res) => {
        try {
            userHelpers.doUserProfileEdit(req.params.id, req.body).then((response) => {
                res.json(response)
            })
        } catch (err) {
            res.json({ error: err.message })
        }
    },
    doChangeDP: (req, res) => {
        try {
            req.body.photo = req.file.filename
            userHelpers.changeDp(req.user, req.body.photo).then((response) => {
                console.log(response);
                res.json(response);
            })

        } catch (err) {
            res.json({ error: err.message })
        }
    },
    doSavePost: (req, res) => {
        try {
            console.log(req.body.id);
            console.log("req.user",req.user);
            const postId = req.body.id
            const userId = req.user
            userHelpers.doBookPost(postId, userId).then((response) => {
                res.json(response)
            })

        } catch (err) {
            res.json({ error: err.message })
        }

    },
    doUnsavePost: (req, res) => {
        try {
            console.log(req.body.id);
            console.log(req.user);
            const postId = req.body.id
            const userId = req.user
            userHelpers.doUnBookPost(postId, userId).then((response) => {
                res.json(response)
            })

        } catch (err) {
            res.json({ error: err.message })
        }
    },
    doSavedPosts:async(req,res)=>{
        try{
            console.log(req.params.id);
            await userHelpers.getSavedPosts(req.params.id).then((response) => {
                console.log(response);
                res.json(response)
            })

        }catch (err) {
            res.json({ error: err.message })
        }
    },
    doSearch:async(req,res)=>{
        try{
            console.log(req.params.data);
            await userHelpers.userSearch(req.params.data).then((response) => {
                res.json(response)
            })
            

        }catch (err) {
            res.json({ error: err.message })
        }
    },
    
}
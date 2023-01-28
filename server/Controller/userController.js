const jwt = require('jsonwebtoken')
const userSignUp = require('../models/userSignUp')
const bcrypt = require('bcrypt')
const userHelpers = require('../Helpers/userHelpers')
const { response } = require('express')
const e = require('express')

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
            const { email, password } = req.body
            console.log(email);
            const user = await userSignUp.findOne({ email: email })
            if (!user) {
                return res
                    .status(400)
                    .json({ msg: "No account found" });
            }
            const id = user.id
            const blockUser = await userSignUp.findById(id)
            if (!blockUser?.Status) {
                return res
                    .status(400)
                    .json({ msg: "Your account has been blocked" })
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Invalid password" });
            await userSignUp.findByIdAndUpdate(id, { $set: { reportStatus: false } })
            const token = jwt.sign({ email: user.userName, id: user._id }, process.env.JWT_SECRET,
                { expiresIn: "3d" })
            res.json({
                token,
                user: {
                    id: user._id,
                    username: user.userName,
                    profilePhoto: user.profilePhoto
                },
            });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    doForgetPassword: async (req, res) => {
        const { data } = req.body;
        try {
            const user = await userHelpers.findUser(data)
            if (user.error) {
                res.status(400).json(user)
            } else {
                const { _id, email } = user
                const otp = userHelpers.OTPgenerator()
                userHelpers.sentOTPverificationmail(email, otp)
                const saltPassword = await bcrypt.genSalt(10)
                const secureOTP = await bcrypt.hash(otp, saltPassword)
                const encryptedOTP = await userHelpers.encryptedOTPintoDB(_id, secureOTP)
                res.json(encryptedOTP)

            }
        } catch (err) {
            res.status(500).json({ error: err?.message })
        }
    },
    doOtpLogin: async (req, res) => {
        try {
            const { userId, otp, password } = req.body
            const user = await userSignUp.findById(userId)
            const isMatch = await bcrypt.compare(otp, user.otp);
            if (!isMatch) return res.json({ msg: "Invalid OTP" });
            const saltPassword = await bcrypt.genSalt(10)
            const securePassword = await bcrypt.hash(password, saltPassword)
            await userSignUp.findByIdAndUpdate(userId, {
                $set: {
                    password: securePassword
                }
            })
            return res.json(true)
        } catch (err) {
            res.json({ error: err?.message })
        }
    },
    //check if token is valid
    doTokenIsValid: async (req, res) => {
        try {
            const token = req.header("x-auth-token")
            if (!token) return res.json(false)
            const verified = jwt.verify(token, process.env.JWT_SECRET)
            if (!verified) return res.json(false)
            const user = await userSignUp.findById(verified.id)
            if (!user) return res.json(false)
            return res.json(true)
        } catch (err) {
            res.json({ error: err?.message })
        }

    },
    doPost: async (req, res) => {
        try {
            req.body.postImage = req.file.filename
            await userHelpers.Posts(req.body, req.user)
            res.status(201).json(true)
        } catch (err) {
            res.json({ error: err?.message })
        }
    },
    getPost: async (req, res) => {
        const userId = req.user
        try {
            const response = await userHelpers.listPosts(userId)
            res.json(response)
        } catch (err) {
            res.json({ error: err })
        }

    },
    getTagedPosts: async (req, res) => {
        try {
            const tagId = req.params.id
            const response = await userHelpers.tagedPosts(tagId)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err })

        }

    },
    getLatestPost: async (req, res) => {
        try {
            const response = await userHelpers.latestPosts()
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err })

        }

    },
    doLikePost: async (req, res) => {
        try {
            const postId = req.body.id
            const userId = req.user
            const response = await userHelpers.doLikePost(postId, userId)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err })

        }

    },
    doUnLikePost: async (req, res) => {
        try {
            const postId = req.body.id
            const userId = req.user
            const response = await userHelpers.doUnLikePost(postId, userId)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err })
        }
    },
    doComment: async (req, res) => {
        try {
            const { postId, comment } = req.body
            const userId = req.user
            const response = await userHelpers.docommentPost(postId, userId, comment)
            res.status(500).json(response)
        } catch (err) {
            res.json({ error: err.message })
        }
    },
    getComment: async (req, res) => {
        try {
            const response = await userHelpers.getCommentPosts(req.params.id)
            res.json(response)
        } catch (err) {
            res.json({ error: err.message })
        }
    },
    getCommentPost: async (req, res) => {
        try {
            const response = await userHelpers.getPost(req.params.id)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    doUserNames: async (req, res) => {
        try {
            const response = await userHelpers.getUserNames()
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    doUserHead: async (req, res) => {
        try {
            const response = await userHelpers.getUserHead(req.params.id)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    doUserPosts: async (req, res) => {
        try {
            const response = await userHelpers.getUserPosts(req.params.id)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getUserProfileForEdit: async (req, res) => {
        try {
            const response = await userHelpers.getUserProfileForEdit(req.params.id)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    doEditProfile: async (req, res) => {
        try {
            const response = await userHelpers.doUserProfileEdit(req.params.id, req.body)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    doChangeDP: async (req, res) => {
        try {
            req.body.photo = req.file.filename
            const response = await userHelpers.changeDp(req.user, req.body.photo)
            res.json(response);
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    changePassword: async (req, res) => {
        try {
            const { password } = req.body
            const saltPassword = await bcrypt.genSalt(10)
            const securePassword = await bcrypt.hash(password, saltPassword)
            await userHelpers.doChangePassword(req.user, securePassword)
            res.json(response);
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    doSavePost: async (req, res) => {
        try {
            const postId = req.body.id
            const userId = req.user
            const response = await userHelpers.doBookPost(postId, userId)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    doUnsavePost: async (req, res) => {
        try {
            const postId = req.body.id
            const userId = req.user
            const response = await userHelpers.doUnBookPost(postId, userId)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    doSavedPosts: async (req, res) => {
        try {
            const response = await userHelpers.getSavedPosts(req.params.id)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    doSearch: async (req, res) => {
        try {
            const response = await userHelpers.userSearch(req.params.data)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    doFollow: async (req, res) => {
        try {
            const response = await userHelpers.userFollow(req.user, req.params.id)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    doUnfollow: async (req, res) => {
        try {
            const response = await userHelpers.userUnfollow(req.user, req.params.id)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getSuggestions: async (req, res) => {
        try {
            const response = await userHelpers.doSuggestions(req.params.id)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    doDeletePost: async (req, res) => {
        try {
            const response = await userHelpers.deletePost(req.params.id)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    doReportPost: async (req, res) => {
        try {
            const response = await userHelpers.reportPost(req.user, req.body)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getFollowers: async (req, res) => {
        try {
            const response = await userHelpers.followers(req.params.id)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getFollowing: async (req, res) => {
        try {
            const response = await userHelpers.following(req.params.id)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    doNotifications: async (req, res) => {
        try {
            const result = await userHelpers.addNotifications(req.body)
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getNotifications: async (req, res) => {
        try {
            const result = await userHelpers.getUserNotifications(req.user)
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    EditNotifications: async (req, res) => {
        try {
            const result = await userHelpers.doNotifications(req.params.id)
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getNotificationsCount: async (req, res) => {
        try {
            const result = await userHelpers.getUserNotificationsCount(req.user)
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getTags: async (req, res) => {
        try {
            var str = req.query.data;
            var result = '#' + str;
            const response = await userHelpers.getAllTags(result)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getTopTenTags: async (req, res) => {
        try {
            const response = await userHelpers.TopTenTags()
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    deactiveAccount: async (req, res) => {
        try {
            const { id } = req.params
            const response = await userHelpers.doDeactiveAccount(id)
            res.json(response)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}
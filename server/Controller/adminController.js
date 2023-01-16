const jwt = require('jsonwebtoken')
const adminSignUp = require('../models/AdminSignUp')
const bcrypt = require('bcrypt')
const adminHelpers = require('../Helpers/adminHelpers')
const { response } = require('express')

module.exports = {
    doSignup: async (req, res) => {
        try {
            const { email, password } = req.body
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
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }

    },
    doLogin: async (req, res) => {
        try {
            const { email, password } = req.body
            if (!email || !password)
                return res
                    .status(400)
                    .json({ msg: "Not all fields have been entered." })
            const user = await adminSignUp.findOne({ email: email })
            if (!user)
                return res
                    .status(400)
                    .json({ msg: "No account with this email has been registered." });
            const isMatch = await bcrypt.compare(password, user.password);


            if (!isMatch) return res.status(400).json({ msg: "Invalid password" });
            const token = jwt.sign({ email: email }, process.env.JWT_SECRET,
                { expiresIn: "3d" })
            console.log("token: " + token);

            res.json({
                token,
                user: {
                    username: email,
                },
            });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getUsers: async (req, res) => {
        try {
            const response = await adminHelpers.users()
            res.status(200).json(response)
        }
        catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    doBlockUser: async (req, res) => {
        const id = req.params.id;
        try {
            const response = await adminHelpers.blockUser(id)
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getPosts: async (req, res) => {
        try {
            const response = await adminHelpers.PostsList()
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    doBlockPost: async (req, res) => {
        console.log(req.params.id);
        const id = req.params.id;
        try {
            const response = await adminHelpers.blockPost(id)
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getReportedUsers: async (req, res) => {
        try {
            const id = req.params.id
            const response = await adminHelpers.ReportedUsers(id)
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }
}
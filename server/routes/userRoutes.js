const express = require('express')
const router = express.Router()
const controller = require('../controller/userController')
const auth = require('../middleware/auth')
const upload = require('../middleware/postMulter')


router.post('/signup',controller.doSignup)

router.post('/login',controller.doLogin)
router.post('/otpverify',controller.doOtpVerify)
router.post('/tokenIsValid',auth,controller.doTokenIsValid)

router.post('/post',upload.single("Posts"),controller.doPost)

module.exports = router
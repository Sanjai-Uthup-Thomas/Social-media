const { Router } = require('express')
const express = require('express')
const router = express.Router()
const controller = require('../controller/userController')
const auth = require('../middleware/auth')
const upload = require('../middleware/postMulter')


router.post('/signup',controller.doSignup)

router.post('/login',controller.doLogin)
router.post('/otpverify',controller.doOtpVerify)
router.post('/tokenIsValid',auth,controller.doTokenIsValid)


router.post('/post',auth,upload.single("Posts"),controller.doPost)
router.get('/post',controller.getPost)

router.patch('/likePost',auth,controller.doLikePost)
router.patch('/unlikePost',auth,controller.doUnLikePost)

router.post('/addcomment',auth,controller.doComment)
router.get('/comments/:id',controller.getComment)
router.get('/commentpost/:id',controller.getCommentPost)





module.exports = router
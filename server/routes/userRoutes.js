const { Router } = require('express')
const express = require('express')
const router = express.Router()
const controller = require('../controller/userController')
const auth = require('../middleware/auth')
const upload = require('../middleware/postMulter')
const DPupload = require('../middleware/DPMulter')


router.post('/signup', controller.doSignup)

router.post('/login', controller.doLogin)
router.post('/otpverify', controller.doOtpVerify)
router.post('/tokenIsValid', auth, controller.doTokenIsValid)


router.post('/post', auth, upload.single("Posts"), controller.doPost)
router.get('/post', auth, controller.getPost)
router.patch('/likePost', auth, controller.doLikePost)
router.patch('/unlikePost', auth, controller.doUnLikePost)

router.post('/addcomment', auth, controller.doComment)
router.get('/comments/:id', auth, controller.getComment)
router.get('/commentpost/:id', auth, controller.getCommentPost)
router.get('/userNames', auth, controller.doUserNames)
router.get('/userHead/:id', auth, controller.doUserHead)
router.get('/userPosts/:id', auth, controller.doUserPosts)
router.get('/getUserProfileForEdit/:id', auth, controller.getUserProfileForEdit)
router.post('/editProfile/:id', auth, controller.doEditProfile)
router.post('/changeDP', auth, DPupload.single("DP"), controller.doChangeDP)

router.patch('/bookmarkPost', auth, controller.doSavePost)
router.patch('/unbookmarkPost', auth, controller.doUnsavePost)
router.get('/savedPosts/:id', auth, controller.doSavedPosts)

router.get('/search/:data', auth, controller.doSearch)

router.patch('/follow/:id', auth, controller.doFollow)
router.patch('/unfollow/:id', auth, controller.doUnfollow)
router.get('/suggestions/:id', auth, controller.getSuggestions)

router.delete('/deletepost/:id', auth, controller.doDeletePost)

router.patch('/reportpost', auth, controller.doReportPost)

router.get('/getfollowers/:id', auth, controller.getFollowers)

router.get('/getfollowing/:id', auth, controller.getFollowing)

router.post('/addnotification', auth, controller.doNotifications)

router.get('/getnotifications',auth, controller.getNotifications)


































module.exports = router
const express = require('express')
const router = express.Router()
const controller = require('../Controller/adminController')
const auth = require('../middleware/adminAuth')

router.post('/adminSignup',controller.doSignup)

router.post('/adminLogin',controller.doLogin)

router.get('/userlist',auth,controller.getUsers)
router.patch('/blockuser/:id',auth,controller.doBlockUser)

router.get('/post',auth,controller.getPosts)
router.patch('/blockpost/:id',auth,controller.doBlockPost)

router.get('/reportedUsers/:id',auth,controller.getReportedUsers)





module.exports = router
const express = require('express')
const router = express.Router()
const controller = require('../controller/adminController')

router.post('/adminSignup',controller.doSignup)

router.post('/adminLogin',controller.doLogin)

router.get('/userlist',controller.getUsers)
router.patch('/blockuser/:id',controller.doBlockUser)

router.get('/post',controller.getPosts)
router.patch('/blockpost/:id',controller.doBlockPost)

router.get('/reportedUsers/:id',controller.getReportedUsers)





module.exports = router
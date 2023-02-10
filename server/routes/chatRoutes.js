const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const controller = require('../Controller/chatController')

router.get('/',auth,controller.getAllChats)
router.post('/:id',auth,controller.createChat)
router.get('/chatlist/:chatID',auth,controller.chatList)
router.get('/search/:data',auth,controller.searchList)


module.exports = router;

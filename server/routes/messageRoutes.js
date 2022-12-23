const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const controller = require('../controller/messageController')


router.post('/',auth,controller.createMessages)
router.get('/:chatId',auth,controller.getAllMessages)


module.exports = router;

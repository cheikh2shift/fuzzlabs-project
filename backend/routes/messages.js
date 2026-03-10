const express = require('express')
const router = express.Router()
const { submitMessage, getAllMessages } = require('../controllers/messageController')
const { authenticate } = require('../middleware/auth')

router.post('/', submitMessage)
router.get('/', authenticate, getAllMessages)

module.exports = router

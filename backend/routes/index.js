const express = require('express')
const authRoutes = require('./auth')
const portfolioRoutes = require('./portfolio')
const messageRoutes = require('./messages')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/portfolio', portfolioRoutes)
router.use('/contact', messageRoutes)

module.exports = router

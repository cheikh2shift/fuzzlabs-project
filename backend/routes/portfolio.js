const express = require('express')
const router = express.Router()
const { getAll, getMine, create, update, remove } = require('../controllers/portfolioController')
const { authenticate } = require('../middleware/auth')
const { upload } = require('../middleware/upload')

router.get('/', getAll)
router.get('/mine', authenticate, getMine)
router.post('/', authenticate, upload.single('image'), create)
router.put('/:id', authenticate, upload.single('image'), update)
router.delete('/:id', authenticate, remove)

module.exports = router

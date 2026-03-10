const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const config = require('../config')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadDir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${uuidv4()}${ext}`)
  }
})

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase()
  const mime = file.mimetype
  
  if (config.allowedImageTypes.test(ext) && config.allowedImageTypes.test(mime)) {
    cb(null, true)
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, webp) are allowed'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: config.maxFileSize }
})

module.exports = { upload }

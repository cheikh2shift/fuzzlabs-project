const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const config = require('./config')
const routes = require('./routes')
const { errorHandler } = require('./middleware/errorHandler')

const ensureUploadsDir = () => {
  const uploadsDir = path.join(__dirname, config.uploadDir)
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
  }
  return uploadsDir
}

const createApp = () => {
  const app = express()

  app.use(cors())
  app.use(express.json())

  const uploadsDir = ensureUploadsDir()
  app.use('/uploads', express.static(uploadsDir))

  app.use('/api/v1', routes)
  app.use(errorHandler)

  return app
}

module.exports = { createApp }

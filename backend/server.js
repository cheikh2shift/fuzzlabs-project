const config = require('./config')
const { initDb } = require('./config/database')
const { createApp } = require('./app')

const startServer = async () => {
  await initDb()

  const app = createApp()
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
  })
}

startServer()

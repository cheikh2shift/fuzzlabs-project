const db = require('../config/database')

const messageModel = {
  findAll: () => {
    return db.all('SELECT * FROM messages ORDER BY created_at DESC')
  },

  create: (name, email, subject, message) => {
    return db.run(
      'INSERT INTO messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, subject, message]
    )
  }
}

module.exports = { messageModel }

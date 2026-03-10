const db = require('../config/database')

const userModel = {
  findByEmail: (email) => {
    return db.get('SELECT * FROM users WHERE email = $1', [email])
  },

  findById: (id) => {
    return db.get('SELECT id, email, name, created_at FROM users WHERE id = $1', [id])
  },

  create: (email, password, name) => {
    return db.run(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email, password, name]
    )
  }
}

module.exports = { userModel }

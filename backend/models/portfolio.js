const db = require('../config/database')

const portfolioModel = {
  findAll: () => {
    return db.all(`
      SELECT p.*, u.name as author_name 
      FROM portfolio_items p 
      JOIN users u ON p.user_id = u.id 
      ORDER BY p.created_at DESC
    `)
  },

  findByUserId: (userId) => {
    return db.all('SELECT * FROM portfolio_items WHERE user_id = $1 ORDER BY created_at DESC', [userId])
  },

  findById: (id) => {
    return db.get('SELECT * FROM portfolio_items WHERE id = $1', [id])
  },

  findByIdAndUserId: (id, userId) => {
    return db.get('SELECT * FROM portfolio_items WHERE id = $1 AND user_id = $2', [id, userId])
  },

  create: (userId, title, description, image) => {
    return db.run(
      'INSERT INTO portfolio_items (user_id, title, description, image) VALUES ($1, $2, $3, $4) RETURNING id',
      [userId, title, description, image]
    )
  },

  update: (id, title, description, image) => {
    return db.run(
      'UPDATE portfolio_items SET title = $1, description = $2, image = $3, updated_at = NOW() WHERE id = $4',
      [title, description, image, id]
    )
  },

  delete: (id) => {
    return db.run('DELETE FROM portfolio_items WHERE id = $1', [id])
  }
}

module.exports = { portfolioModel }

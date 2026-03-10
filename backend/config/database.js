const { Pool } = require('pg')
const config = require('./index')

let pool = null

const initDb = async () => {
  if (pool) return pool

  pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  })

  await pool.query('SELECT 1')

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS portfolio_items (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT,
      image TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `)

  return pool
}

const getDb = () => pool

const run = (sql, params = []) => {
  return pool.query(sql, params)
}

const get = async (sql, params = []) => {
  const { rows } = await pool.query(sql, params)
  return rows[0] || null
}

const all = async (sql, params = []) => {
  const { rows } = await pool.query(sql, params)
  return rows
}

module.exports = { initDb, getDb, run, get, all }

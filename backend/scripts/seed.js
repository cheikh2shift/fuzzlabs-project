const bcrypt = require('bcryptjs')
const { initDb } = require('../config/database')
const { userModel } = require('../models/user')

const getEnv = (key, fallback = '') => process.env[key] || fallback

const seedAdmin = async () => {
  const email = getEnv('ADMIN_EMAIL', 'admin@portfolio.local').toLowerCase()
  const name = getEnv('ADMIN_NAME', 'Portfolio Admin')
  const password = getEnv('ADMIN_PASSWORD', 'ChangeMe123!')

  if (!password || password.length < 6) {
    throw new Error('ADMIN_PASSWORD must be at least 6 characters')
  }

  const existing = await userModel.findByEmail(email)
  if (existing) {
    console.log(`Admin user already exists: ${email}`)
    return existing
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const result = await userModel.create(email, hashedPassword, name)
  const created = result.rows[0]
  console.log(`Admin user created: ${created.email} (id: ${created.id})`)
  return created
}

const run = async () => {
  await initDb()
  await seedAdmin()
  process.exit(0)
}

run().catch((err) => {
  console.error('Seeding failed:', err.message)
  process.exit(1)
})

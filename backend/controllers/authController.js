const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { userModel } = require('../models/user')
const config = require('../config')

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    const existingUser = await userModel.findByEmail(email.toLowerCase())
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await userModel.create(email.toLowerCase(), hashedPassword, name)
    const createdUser = result.rows[0]

    const token = jwt.sign(
      { id: createdUser.id, email, name },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    )

    res.status(201).json({
      token,
      user: { id: createdUser.id, email, name }
    })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await userModel.findByEmail(email.toLowerCase())
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    )

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name }
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}

const getMe = async (req, res) => {
  const user = await userModel.findById(req.user.id)
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  res.json(user)
}

module.exports = { register, login, getMe }

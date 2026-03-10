const { messageModel } = require('../models/message')

const submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    if (message.trim().length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters' })
    }

    await messageModel.create(
      name.trim(),
      email.toLowerCase(),
      subject?.trim() || '',
      message.trim()
    )

    res.status(201).json({ message: 'Message sent successfully' })
  } catch (err) {
    console.error('Submit message error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}

const getAllMessages = async (req, res) => {
  try {
    const messages = await messageModel.findAll()
    res.json(messages)
  } catch (err) {
    console.error('Get messages error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = { submitMessage, getAllMessages }

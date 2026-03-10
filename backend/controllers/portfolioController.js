const fs = require('fs')
const path = require('path')
const { portfolioModel } = require('../models/portfolio')
const config = require('../config')

const getAll = async (req, res) => {
  try {
    const items = await portfolioModel.findAll()
    res.json(items)
  } catch (err) {
    console.error('Get portfolio error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}

const getMine = async (req, res) => {
  try {
    const items = await portfolioModel.findByUserId(req.user.id)
    res.json(items)
  } catch (err) {
    console.error('Get portfolio error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}

const create = async (req, res) => {
  try {
    const { title, description } = req.body

    if (!title || title.trim().length < 2) {
      return res.status(400).json({ error: 'Title must be at least 2 characters' })
    }

    const image = req.file ? `/uploads/${req.file.filename}` : null
    const result = await portfolioModel.create(
      req.user.id,
      title.trim(),
      description?.trim() || '',
      image
    )

    const item = await portfolioModel.findById(result.rows[0].id)
    res.status(201).json(item)
  } catch (err) {
    console.error('Create portfolio error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description } = req.body

    const existing = await portfolioModel.findByIdAndUserId(id, req.user.id)
    if (!existing) {
      return res.status(404).json({ error: 'Not found or unauthorized' })
    }

    if (!title || title.trim().length < 2) {
      return res.status(400).json({ error: 'Title must be at least 2 characters' })
    }

    const image = req.file ? `/uploads/${req.file.filename}` : existing.image
    
    await portfolioModel.update(id, title.trim(), description?.trim() || '', image)
    const item = await portfolioModel.findById(id)
    res.json(item)
  } catch (err) {
    console.error('Update portfolio error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}

const remove = async (req, res) => {
  try {
    const { id } = req.params

    const existing = await portfolioModel.findByIdAndUserId(id, req.user.id)
    if (!existing) {
      return res.status(404).json({ error: 'Not found or unauthorized' })
    }

    if (existing.image) {
      const imagePath = existing.image.startsWith('/')
        ? existing.image.slice(1)
        : existing.image
      const imgPath = path.join(__dirname, '..', imagePath)
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath)
      }
    }

    await portfolioModel.delete(id)
    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    console.error('Delete portfolio error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = { getAll, getMine, create, update, remove }

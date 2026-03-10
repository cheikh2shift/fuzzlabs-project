import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, token, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  
  const [items, setItems] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({ title: '', description: '', image: null })
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('portfolio')

  useEffect(() => {
    if (!authLoading && !token) {
      navigate('/login')
    }
  }, [authLoading, token, navigate])

  useEffect(() => {
    if (token) {
      fetchData()
    }
  }, [token])

  const fetchData = async () => {
    try {
      const [portfolioRes, messagesRes] = await Promise.all([
        fetch('/api/v1/portfolio/mine', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/v1/contact', { headers: { Authorization: `Bearer ${token}` } })
      ])
      
      const portfolioData = await portfolioRes.json()
      const messagesData = await messagesRes.json()
      
      setItems(portfolioData)
      setMessages(messagesData)
    } catch (err) {
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const form = new FormData()
    form.append('title', formData.title)
    form.append('description', formData.description)
    if (formData.image) {
      form.append('image', formData.image)
    }

    try {
      const url = editingItem ? `/api/v1/portfolio/${editingItem.id}` : '/api/v1/portfolio'
      const method = editingItem ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: form
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      
      setShowModal(false)
      setEditingItem(null)
      setFormData({ title: '', description: '', image: null })
      fetchData()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    
    try {
      const res = await fetch(`/api/v1/portfolio/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (!res.ok) throw new Error('Failed to delete')
      fetchData()
    } catch (err) {
      alert(err.message)
    }
  }

  const openEdit = (item) => {
    setEditingItem(item)
    setFormData({ title: item.title, description: item.description, image: null })
    setShowModal(true)
  }

  if (authLoading || loading) {
    return <div className="container"><p>Loading...</p></div>
  }

  return (
    <div className="dashboard container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <button className="btn" onClick={() => {
          setEditingItem(null)
          setFormData({ title: '', description: '', image: null })
          setShowModal(true)
        }}>
          Add Project
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button 
          className={`btn ${activeTab === 'portfolio' ? '' : 'btn-secondary'}`}
          onClick={() => setActiveTab('portfolio')}
          style={{ marginRight: '1rem' }}
        >
          Portfolio ({items.length})
        </button>
        <button 
          className={`btn ${activeTab === 'messages' ? '' : 'btn-secondary'}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages ({messages.length})
        </button>
      </div>

      {activeTab === 'portfolio' && (
        items.length === 0 ? (
          <div className="empty-state">
            <p>No portfolio items yet. Click "Add Project" to create your first one!</p>
          </div>
        ) : (
          <div className="dashboard-grid">
            {items.map(item => (
              <div key={item.id} className="portfolio-card">
                {item.image && (
                  <img src={item.image} alt={item.title} className="portfolio-image" />
                )}
                <div className="portfolio-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-secondary" onClick={() => openEdit(item)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {activeTab === 'messages' && (
        messages.length === 0 ? (
          <div className="empty-state">
            <p>No messages yet.</p>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map(msg => (
              <div key={msg.id} className="message-item">
                <div className="message-header">
                  <strong>{msg.name}</strong>
                  <span>{new Date(msg.created_at).toLocaleDateString()}</span>
                </div>
                <div className="message-subject">{msg.email}</div>
                {msg.subject && <div className="message-subject">{msg.subject}</div>}
                <p>{msg.message}</p>
              </div>
            ))}
          </div>
        )
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{editingItem ? 'Edit Project' : 'Add New Project'}</h2>
            {error && <div className="form-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setFormData({ ...formData, image: e.target.files[0] })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn">
                  {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'

export default function Portfolio() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/v1/portfolio')
      .then(res => res.json())
      .then(data => {
        setItems(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="container"><p>Loading...</p></div>
  }

  return (
    <div className="container">
      <div className="section-header">
        <h1>Portfolio</h1>
        <p>Selected work across SaaS platforms, real-time dashboards, and cloud-native systems.</p>
      </div>
      {items.length === 0 ? (
        <div className="empty-state">
          <p>No projects yet. Login to add your first project!</p>
        </div>
      ) : (
        <div className="portfolio-grid">
          {items.map(item => (
            <div key={item.id} className="portfolio-card">
              {item.image && (
                <img src={item.image} alt={item.title} className="portfolio-image" />
              )}
              <div className="portfolio-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="portfolio-meta">
                  By {item.author_name}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

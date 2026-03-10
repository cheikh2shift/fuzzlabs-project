import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout, token } = useAuth()

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo">
          Cheikh<span>Seck</span>
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/contact">Contact</Link>
          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout} className="btn btn-secondary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

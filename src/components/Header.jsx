import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = ({ onLogout }) => {
  const location = useLocation()

  return (
    <header className="admin-header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/dashboard" className="logo">
            <h2>Shine Jewel Tech Admin</h2>
          </Link>
          
          <nav className="admin-nav">
            <Link 
              to="/dashboard" 
              className={location.pathname === '/dashboard' ? 'active' : ''}
            >
              Dashboard
            </Link>
            <Link 
              to="/products" 
              className={location.pathname === '/products' ? 'active' : ''}
            >
              Products
            </Link>
          </nav>
        </div>
        
        <div className="header-right">
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

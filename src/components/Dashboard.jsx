import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

const Dashboard = ({ onLogout }) => {
  return (
    <div className="dashboard">
      <Header onLogout={onLogout} />
      
      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Admin Dashboard</h1>
          <p>Manage your Shine Jewel Tech website content</p>
        </div>
        
        <div className="dashboard-cards">
          <Link to="/products" className="dashboard-card">
            <div className="card-icon">📦</div>
            <h3>Manage Products</h3>
            <p>Add, edit, or remove products from your website</p>
          </Link>
          
          <div className="dashboard-card">
            <div className="card-icon">📊</div>
            <h3>Analytics</h3>
            <p>View website statistics and performance</p>
          </div>
          
          <div className="dashboard-card">
            <div className="card-icon">✉️</div>
            <h3>Messages</h3>
            <p>Manage customer inquiries and contacts</p>
          </div>
          
          <div className="dashboard-card">
            <div className="card-icon">⚙️</div>
            <h3>Settings</h3>
            <p>Configure website settings and preferences</p>
          </div>
        </div>
        
        <div className="quick-stats">
          <div className="stat-card">
            <h4>Total Products</h4>
            <p className="stat-number">12</p>
          </div>
          <div className="stat-card">
            <h4>This Month Views</h4>
            <p className="stat-number">1,234</p>
          </div>
          <div className="stat-card">
            <h4>Contact Requests</h4>
            <p className="stat-number">23</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

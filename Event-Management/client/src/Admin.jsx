import React, { useState } from 'react';
import './Admin.css';
import { FaBars, FaHome, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <div className="admin-container">
      <div className={`side-panel ${isSidePanelOpen ? 'open' : ''}`}>
        <button className="toggle-button" onClick={toggleSidePanel}>
          <FaBars />
        </button>
        <ul>
          <li>
            <FaHome className="icon" />
            <span>Dashboard</span>
          </li>
          <li onClick={() => navigate('/admin/users')}>
            <FaUser className="icon" />
            <span>Users</span>
          </li>
          <li onClick={() => navigate('/admin/events')}>
            <FaCalendarAlt className="icon" />
            <span>Events</span>
          </li>
        </ul>
      </div>
      <div className={`content ${isSidePanelOpen ? 'shifted' : ''}`}>
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="header-icons">
            <button className="toggle-button" onClick={toggleSidePanel}>
              <FaBars />
            </button>
            <button className="icon-button">
              <FaUser />
            </button>
          </div>
        </header>
        <div className="admin-summary">
          <div className="summary-card">
            <h2>Active Events</h2>
            <p>31</p>
          </div>
          <div className="summary-card">
            <h2>Server Status</h2>
            <p className="status-live">Live</p>
          </div>
        </div>
        <div className="system-summary">
          <h2>System Summary</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <h3>Events</h3>
              <p>120</p>
              <span>-10% from last week</span>
            </div>
            <div className="summary-item">
              <h3>Invitations</h3>
              <p>500</p>
              <span>+15% from last week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
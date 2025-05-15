import React, { useState } from 'react';
import { FaBars, FaHome, FaUser, FaCalendarAlt, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function Admin() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <div className="admin-container">
      <header className="header">
        <div className="header-left">
          <button className="toggle-button" onClick={toggleSidePanel}>
            <FaBars />
          </button>
        </div>
        <div className="header-right">
          <button className="icon-button">
            <FaMoon />
          </button>
          <button className="icon-button" onClick={() => navigate('/login')}>
            <FaSignOutAlt />
          </button>
        </div>
      </header>
      <div className={`side-panel ${isSidePanelOpen ? 'open' : ''}`}>
        <h2>Side Panel</h2>
        <ul>
          <li onClick={() => navigate('/admin')}>
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
      {isSidePanelOpen && (
        <div className={`overlay ${isSidePanelOpen ? 'visible' : ''}`} onClick={toggleSidePanel}></div>
      )}
      <div className="adminWelcomeSection">
        <h1 className="welcome-message">Welcome, Admin</h1>
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
      </div>
      <div className="content">
        <div className="system-summary">
          <h2>System Summary</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <h3>Users</h3>
              <p>250</p>
              <span>-10% from last week</span>
            </div>
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

        <div className="user-management">
          <h2>User Management</h2>
          <div className="user-grid">
            <div className="user-item">
              <div className="user-icon"></div>
              <p>John Doe</p>
            </div>
            <div className="user-item">
              <div className="user-icon"></div>
              <p>Jane Smith</p>
            </div>
            <div className="user-item">
              <div className="user-icon"></div>
              <p>Alice Johnson</p>
            </div>
          </div>
        </div>

        <div className="event-monitoring">
          <h2>Event Monitoring</h2>
          <div className="event-grid">
            <div className="event-item">
              <div className="event-image-placeholder"></div>
              <h3>Annual Conference 2021</h3>
              <p>Upcoming Event</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec.</p>
              <p>Objective A</p>
            </div>
            <div className="event-item">
              <div className="event-image-placeholder"></div>
              <h3>Product Launch Party</h3>
              <p>Upcoming Event</p>
              <p>Proin nec justo in urna venenatis hendrerit. Sed euismod.</p>
              <p>Objective B</p>
            </div>
          </div>
        </div>

        <div className="notification-settings">
          <h2>Notification Settings</h2>
          <div className="settings-form">
            <label>
              <input type="checkbox" /> Email Notifications
            </label>
            <label>
              <input type="checkbox" /> Push Notifications
            </label>
            <button className="save-button">Save Settings</button>
          </div>
        </div>

        <div className="system-overview">
          <h2>System Overview</h2>
          <div className="chart-placeholder">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <p>Event Completion</p>
        </div>

        <footer className="admin-footer">
          <p>© 2023 Company Name. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Admin;
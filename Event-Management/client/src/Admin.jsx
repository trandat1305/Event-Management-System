import React, { useEffect, useState } from 'react';
import { FaUser, FaCalendarAlt, FaUserTie, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function Admin() {
  const [stats, setStats] = useState({ users: 0, organizers: 0, events: 0 });
  const navigate = useNavigate();

  // Fake fetch stats (replace with real API call if available)
  useEffect(() => {
    setStats({ users: 120, organizers: 8, events: 31 });
  }, []);

  return (
    <div className="admin-dashboard-bg">
      <div className="admin-dashboard-card">
        <div className="admin-dashboard-header">
          <h1>Admin Dashboard</h1>
          <button className="admin-logout-btn" onClick={() => navigate('/login')}>
            <FaSignOutAlt style={{ marginRight: 8 }} /> Logout
          </button>
        </div>
        <div className="admin-dashboard-stats">
          <div className="admin-dashboard-stat">
            <FaUser className="admin-dashboard-icon" />
            <div>
              <div className="admin-dashboard-stat-label">Total Users</div>
              <div className="admin-dashboard-stat-value">{stats.users}</div>
            </div>
          </div>
          <div className="admin-dashboard-stat">
            <FaUserTie className="admin-dashboard-icon" />
            <div>
              <div className="admin-dashboard-stat-label">Organizers</div>
              <div className="admin-dashboard-stat-value">{stats.organizers}</div>
            </div>
          </div>
          <div className="admin-dashboard-stat">
            <FaCalendarAlt className="admin-dashboard-icon" />
            <div>
              <div className="admin-dashboard-stat-label">Total Events</div>
              <div className="admin-dashboard-stat-value">{stats.events}</div>
            </div>
          </div>
        </div>
        <div className="admin-dashboard-actions">
          <button className="admin-dashboard-action-btn" onClick={() => navigate('/admin/events')}>
            Quản lý sự kiện
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
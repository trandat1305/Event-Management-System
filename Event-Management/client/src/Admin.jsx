import React, { useState } from 'react';
import { FaUser, FaCalendarAlt, FaUserTie, FaSignOutAlt, FaTachometerAlt, FaUsers, FaBell, FaCog, FaEnvelopeOpenText, FaListAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const pages = [
  { key: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { key: 'users', label: 'Users', icon: <FaUsers /> },
  { key: 'events', label: 'Events', icon: <FaCalendarAlt /> },
  { key: 'invitations', label: 'Invitations', icon: <FaEnvelopeOpenText /> },
  { key: 'notifications', label: 'Notifications', icon: <FaBell /> },
  { key: 'settings', label: 'Settings', icon: <FaCog /> },
];

function Admin() {
  const [stats] = useState({ users: 120, organizers: 8, events: 31 });
  const [page, setPage] = useState('dashboard');
  const navigate = useNavigate();

  // Mock content for each page
  const renderContent = () => {
    switch (page) {
      case 'dashboard':
        return (
          <div className="admin-dashboard-main float-in-discover">
            <h1 style={{ color: '#f05537', fontWeight: 700, fontSize: '2rem', textAlign: 'center', margin: 0, letterSpacing: 1 }}>Admin Dashboard</h1>
            <div className="admin-dashboard-stats" style={{ display: 'flex', gap: 24, width: '100%', justifyContent: 'center', margin: '2.5rem 0' }}>
              <div className="admin-dashboard-stat" style={{ background: '#fff7f2', borderRadius: 16, boxShadow: '0 2px 8px rgba(240,85,55,0.07)', padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: 16, minWidth: 120 }}>
                <FaUser className="admin-dashboard-icon" style={{ color: '#f05537', fontSize: 32 }} />
                <div>
                  <div className="admin-dashboard-stat-label" style={{ color: '#888', fontWeight: 600 }}>Total Users</div>
                  <div className="admin-dashboard-stat-value" style={{ color: '#f05537', fontWeight: 700, fontSize: 22 }}>{stats.users}</div>
                </div>
              </div>
              <div className="admin-dashboard-stat" style={{ background: '#f6f7ff', borderRadius: 16, boxShadow: '0 2px 8px rgba(100,108,255,0.07)', padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: 16, minWidth: 120 }}>
                <FaUserTie className="admin-dashboard-icon" style={{ color: '#646cff', fontSize: 32 }} />
                <div>
                  <div className="admin-dashboard-stat-label" style={{ color: '#888', fontWeight: 600 }}>Organizers</div>
                  <div className="admin-dashboard-stat-value" style={{ color: '#646cff', fontWeight: 700, fontSize: 22 }}>{stats.organizers}</div>
                </div>
              </div>
              <div className="admin-dashboard-stat" style={{ background: '#fffbe6', borderRadius: 16, boxShadow: '0 2px 8px rgba(255,193,7,0.07)', padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: 16, minWidth: 120 }}>
                <FaCalendarAlt className="admin-dashboard-icon" style={{ color: '#ffc107', fontSize: 32 }} />
                <div>
                  <div className="admin-dashboard-stat-label" style={{ color: '#888', fontWeight: 600 }}>Total Events</div>
                  <div className="admin-dashboard-stat-value" style={{ color: '#ffc107', fontWeight: 700, fontSize: 22 }}>{stats.events}</div>
                </div>
              </div>
            </div>
            <div style={{ margin: '2rem 0', textAlign: 'center', color: '#888' }}>
              <b>Welcome, Admin!</b> Here you can manage users, events, invitations, notifications, and system settings.
            </div>
          </div>
        );
      case 'users':
        return <div className="admin-dashboard-main float-in-discover"><h2 style={{ color: '#f05537' }}>User Management</h2><div style={{color:'#888'}}>List, search, and manage all users here. (UI demo)</div></div>;
      case 'events':
        return <div className="admin-dashboard-main float-in-discover"><h2 style={{ color: '#f05537' }}>Event Management</h2><div style={{color:'#888'}}>List, search, and manage all events here. (UI demo)</div></div>;
      case 'invitations':
        return <div className="admin-dashboard-main float-in-discover"><h2 style={{ color: '#f05537' }}>Invitations</h2><div style={{color:'#888'}}>View all invitations, recipients, and RSVP status. (UI demo)</div></div>;
      case 'notifications':
        return <div className="admin-dashboard-main float-in-discover"><h2 style={{ color: '#f05537' }}>Notifications</h2><div style={{color:'#888'}}>View and manage all system notifications. (UI demo)</div></div>;
      case 'settings':
        return <div className="admin-dashboard-main float-in-discover"><h2 style={{ color: '#f05537' }}>Settings</h2><div style={{color:'#888'}}>System settings and configuration. (UI demo)</div></div>;
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard-layout" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ff6b6b 0%, #646cff 100%)', display: 'flex' }}>
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ width: 220, background: '#fff', boxShadow: '2px 0 12px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2.5rem 0 1.5rem 0', gap: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 22, color: '#f05537', marginBottom: 32, letterSpacing: 1 }}>Admin Panel</div>
        {pages.map(item => (
          <button
            key={item.key}
            className={page === item.key ? 'admin-sidebar-btn active' : 'admin-sidebar-btn'}
            style={{
              background: page === item.key ? 'linear-gradient(135deg, #f05537 0%, #ff6b6b 100%)' : 'none',
              color: page === item.key ? '#fff' : '#f05537',
              fontWeight: 600,
              fontSize: 16,
              border: 'none',
              borderRadius: 8,
              padding: '0.8rem 1.2rem',
              marginBottom: 6,
              width: 170,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
              boxShadow: page === item.key ? '0 2px 8px rgba(240,85,55,0.10)' : 'none',
              transition: 'background 0.2s, color 0.2s',
            }}
            onClick={() => setPage(item.key)}
          >
            {item.icon} {item.label}
          </button>
        ))}
        <button
          className="admin-sidebar-btn"
          style={{ background: '#fff', color: '#f05537', border: '2px solid #f05537', fontWeight: 700, fontSize: 16, borderRadius: 8, padding: '0.8rem 1.2rem', marginTop: 18, width: 170, cursor: 'pointer' }}
          onClick={() => navigate('/login')}
        >
          <FaSignOutAlt style={{ marginRight: 8 }} /> Logout
        </button>
      </aside>
      {/* Main content */}
      <main className="admin-dashboard-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '3.5rem 2rem 2rem 2rem' }}>
        {renderContent()}
      </main>
    </div>
  );
}

export default Admin;
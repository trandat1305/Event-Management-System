import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle, FaPlus, FaCalendarAlt, FaCompass, FaBars } from 'react-icons/fa';
import './User.css';

function User() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Sample user and events data
  const user = { name: 'John Doe', avatar: '' };
  const participatingEvents = [
    { id: 1, title: 'React Conference', date: '2024-06-01', discussionId: 101 },
    { id: 2, title: 'Music Festival', date: '2024-06-10', discussionId: 102 },
  ];
  const organizingEvents = [
    { id: 3, title: 'Tech Meetup', date: '2024-06-15', discussionId: 103 },
    { id: 4, title: 'Startup Pitch', date: '2024-06-20', discussionId: 104 },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-logo">Eventer</div>
        <nav className="sidebar-nav">
          <button onClick={() => navigate('/home/schedule')}><FaCalendarAlt /> Schedule</button>
          <button onClick={() => navigate('/home/discover')}><FaCompass /> Discover</button>
        </nav>
      </aside>
      {/* Main Content */}
      <div className={`main-content${sidebarOpen ? ' shifted' : ''}`}>
        {/* Top Navigation Bar */}
        <header className="top-nav">
          <div className="nav-left">
            <button className="icon-btn hamburger-btn" onClick={() => setSidebarOpen((open) => !open)}><FaBars /></button>
            <span className="nav-logo">Dashboard</span>
          </div>
          <div className="nav-right">
            <button className="icon-btn" onClick={() => navigate('/home/notification')}><FaBell /></button>
            <button className="create-event-btn" onClick={() => navigate('/home/createevent')}><FaPlus /> Create Event</button>
            <div className="user-profile">
              <span className="user-avatar"><FaUserCircle /></span>
              <span className="user-name">{user.name}</span>
              <button className="edit-profile-btn" onClick={() => navigate('/myaccount')}>Edit Profile</button>
            </div>
          </div>
        </header>
        {/* Two Columns */}
        <div className="events-columns">
          <div className="events-column">
            <h2>Participating Events</h2>
            {participatingEvents.map(event => (
              <div key={event.id} className="event-card" onClick={() => navigate(`/event/${event.id}/discussion/${event.discussionId}`)}>
                <h3>{event.title}</h3>
                <p>Date: {event.date}</p>
              </div>
            ))}
          </div>
          <div className="events-column">
            <h2>Organizing/Created Events</h2>
            {organizingEvents.map(event => (
              <div key={event.id} className="event-card" onClick={() => navigate(`/event/${event.id}/discussion/${event.discussionId}`)}>
                <h3>{event.title}</h3>
                <p>Date: {event.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
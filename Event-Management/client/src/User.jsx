import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle, FaPlus, FaCalendarAlt, FaCompass, FaBars, FaUsers, FaAt } from 'react-icons/fa';
import './User.css';

function User() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Sample user and events data with locations
  const participatingEvents = [
    { id: 1, title: 'React Conference', date: '2024-06-01', location: 'Online', discussionId: 101, category: 'Tech' },
    { id: 2, title: 'Music Festival', date: '2024-06-10', location: 'Central Park', discussionId: 102, category: 'Music' },
  ];
  const organizingEvents = [
    { id: 3, title: 'Tech Meetup', date: '2024-06-15', location: 'Tech Hub', discussionId: 103, category: 'Tech' },
    { id: 4, title: 'Startup Pitch', date: '2024-06-20', location: 'Innovation Center', discussionId: 104, category: 'Business' },
  ];

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) {
    navigate('/login');
    return null;
  }

  return (
    <div className="dashboard-container float-in-discover">
      {/* Sidebar */}
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-logo">Eventer</div>
        <nav className="sidebar-nav">
          <button onClick={() => navigate('/home/schedule')}><FaCalendarAlt /> Schedule</button>
          <button onClick={() => navigate('/discover')}><FaCompass /> Discover</button>
          <button onClick={() => navigate('/invitation')}><FaUsers /> Invitation</button>
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
            <button className="create-event-btn" onClick={() => navigate('/createevent')}>+ Create Event</button>
            <div className="user-profile">
              <span className="user-avatar"><FaUserCircle /></span>
              <span className="user-name">{user.username}</span>
              <button className="edit-profile-btn" onClick={() => navigate('/myaccount')}>Edit Profile</button>
            </div>
          </div>
        </header>
        {/* Events Section */}
        <div className="events-section">
          {/* Organizing/Created Events */}
          <div className="event-type">
            <h2>Organizing/Created Events</h2>
            <div className="events-row">
              {organizingEvents.map(event => (
                <div key={event.id} className="event-card" onClick={() => navigate(`/event/${event.id}/discussion/${event.discussionId}`)}>
                  <div className="event-image">
                    <img
                      src={event.imageURL || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'}
                      alt={event.title}
                    />
                    <span className="event-category">{event.category || 'General'}</span>
                  </div>
                  <div className="event-details">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-date">Date: {event.date}</p>
                    <p className="event-location">Location: {event.location}</p>
                    <button className="join-btn">Join</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Participating Events */}
          <div className="event-type">
            <h2>Participating Events</h2>
            <div className="events-row">
              {participatingEvents.map(event => (
                <div key={event.id} className="event-card" onClick={() => navigate(`/event/${event.id}/discussion/${event.discussionId}`)}>
                  <div className="event-image">
                    <img
                      src={event.imageURL || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'}
                      alt={event.title}
                    />
                    <span className="event-category">{event.category || 'General'}</span>
                  </div>
                  <div className="event-details">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-date">Date: {event.date}</p>
                    <p className="event-location">Location: {event.location}</p>
                    <button className="join-btn">Join</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
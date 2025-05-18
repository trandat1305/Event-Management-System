import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBell } from 'react-icons/fa';
import './Notification.css';

function Notification() {
  const navigate = useNavigate();
  // Sample notifications for attendee and organizer roles
  const attendeeNotifications = [
    { id: 1, title: 'Event Reminder', message: 'React Conference starts tomorrow!', time: '2 hours ago' },
    { id: 2, title: 'New Comment', message: 'Someone commented on your event.', time: '5 hours ago' },
  ];
  const organizerNotifications = [
    { id: 3, title: 'Event Update', message: 'Music Festival date changed.', time: '1 day ago' },
    { id: 4, title: 'New Registration', message: 'A new user registered for your event.', time: '3 days ago' },
  ];

  return (
    <div className="notification-centered-page">
      <header className="notification-top-nav">
        <div className="notification-nav-left">
          <button className="notification-back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft style={{ marginRight: '0.5rem', fontSize: '1.1rem' }} /> Back
          </button>     
        </div>
        <div className="notification-title-container">
          <h1 className="notification-title"><FaBell style={{marginRight: '0.5rem'}}/> Notifications</h1>
        </div>
        {/* Optional: <div className="notification-nav-right"></div> */}
      </header>
      <div className="notification-sections-wrapper">
        <div className="notification-section">
          <h2 className="notification-section-title">Attendee Notifications</h2>
          <div className="notification-list">
            {attendeeNotifications.length === 0 ? (
              <div className="no-notifications">No attendee notifications yet.</div>
            ) : (
              attendeeNotifications.map(noti => (
                <div key={noti.id} className="notification-card">
                  <div className="notification-header">
                    <span className="notification-card-title">{noti.title}</span>
                    <span className="notification-time">{noti.time}</span>
                  </div>
                  <div className="notification-message">{noti.message}</div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="notification-section">
          <h2 className="notification-section-title">Organizer Notifications</h2>
          <div className="notification-list">
            {organizerNotifications.length === 0 ? (
              <div className="no-notifications">No organizer notifications yet.</div>
            ) : (
              organizerNotifications.map(noti => (
                <div key={noti.id} className="notification-card">
                  <div className="notification-header">
                    <span className="notification-card-title">{noti.title}</span>
                    <span className="notification-time">{noti.time}</span>
                  </div>
                  <div className="notification-message">{noti.message}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
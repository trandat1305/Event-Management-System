import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBell, FaCheckCircle } from 'react-icons/fa';
import './Notification.css';

function Notification() {
  const navigate = useNavigate();

  // Sample notifications
  const [attendeeNotifications, setAttendeeNotifications] = useState([
    { id: 1, title: 'Event Reminder', message: 'React Conference starts tomorrow!', time: '2 hours ago', read: false },
    { id: 2, title: 'Event Updated', message: 'Event details have changed.', time: '5 hours ago', read: false },
    { id: 3, title: 'Reminder', message: 'Please confirm your attendance for Music Festival.', time: '1 day ago', read: false },
  ]);
  const [organizerNotifications, setOrganizerNotifications] = useState([
    { id: 5, title: 'Event Updated', message: 'You updated the event details.', time: '2 days ago', read: false },
    { id: 6, title: 'Attendee RSVP', message: 'Bob has not responded to your invitation.', time: '3 days ago', read: false },
  ]);
  // Reminders riêng: chỉ các sự kiện sắp tới bạn là organizer, không có thời gian
  const [reminders, setReminders] = useState([
    { id: 101, event: 'Tech Startup Pitch', message: 'Remind attendees to confirm for Tech Startup Pitch.' },
    { id: 102, event: 'ReactJS Meetup 2025', message: 'Remind attendees to confirm for ReactJS Meetup 2025.' },
  ]);

  // Đánh dấu đã đọc
  const markAsRead = (id, type) => {
    if (type === 'attendee') {
      setAttendeeNotifications(noti => noti.map(n => n.id === id ? { ...n, read: true } : n));
    } else {
      setOrganizerNotifications(noti => noti.map(n => n.id === id ? { ...n, read: true } : n));
    }
  };

  // Gửi reminder (demo UI)
  const sendReminder = (id) => {
    alert('Reminder sent to all attendees! (Demo UI)');
    setReminders(rem => rem.filter(r => r.id !== id));
  };

  return (
    <div className="notification-centered-page float-in-discover">
      <header className="notification-top-nav">
        <div className="notification-nav-left">
          <button className="notification-back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft style={{ marginRight: '0.5rem', fontSize: '1.1rem' }} /> Back
          </button>     
        </div>
        <div className="notification-title-container" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1 className="notification-title" style={{ color: '#f05537' }}><FaBell style={{marginRight: '0.5rem'}}/> Notifications</h1>
        </div>
      </header>
      <div className="notification-sections-wrapper">
        <div className="notification-section">
          <h2 className="notification-section-title">Attendee Notifications</h2>
          <div className="notification-list">
            {attendeeNotifications.filter(n => !n.read).length === 0 ? (
              <div className="no-notifications">No attendee notifications yet.</div>
            ) : (
              attendeeNotifications.filter(n => !n.read).map(noti => (
                <div key={noti.id} className="notification-card">
                  <div className="notification-header">
                    <span className="notification-card-title">{noti.title}</span>
                    <span className="notification-time">{noti.time}</span>
                    <FaCheckCircle
                      className="notification-tick"
                      title="Mark as read"
                      onClick={() => markAsRead(noti.id, 'attendee')}
                    />
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
            {organizerNotifications.filter(n => !n.read).length === 0 ? (
              <div className="no-notifications">No organizer notifications yet.</div>
            ) : (
              organizerNotifications.filter(n => !n.read).map(noti => (
                <div key={noti.id} className="notification-card">
                  <div className="notification-header">
                    <span className="notification-card-title">{noti.title}</span>
                    <span className="notification-time">{noti.time}</span>
                    <FaCheckCircle
                      className="notification-tick"
                      title="Mark as read"
                      onClick={() => markAsRead(noti.id, 'organizer')}
                    />
                  </div>
                  <div className="notification-message">{noti.message}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* Reminders section tách biệt, ở dưới cùng */}
      <div className="reminder-section-standalone">
        <h2 className="notification-section-title">Reminders</h2>
        <div className="notification-list">
          {reminders.length === 0 ? (
            <div className="no-notifications">No reminders to send.</div>
          ) : (
            reminders.map(rem => (
              <div key={rem.id} className="notification-card">
                <div className="notification-header">
                  <span className="notification-card-title">{rem.event}</span>
                  <button className="reminder-btn" onClick={() => sendReminder(rem.id)}>Send Reminder</button>
                </div>
                <div className="notification-message">{rem.message}</div>
              </div>
            ))
          )}
        </div>
      </div>
      <style>{`
        .notification-tick {
          color: #27ae60;
          font-size: 1.3rem;
          margin-left: 1rem;
          cursor: pointer;
          transition: color 0.2s;
        }
        .notification-tick:hover {
          color: #219150;
        }
        .reminder-btn {
          background: #f05537;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0.3rem 1rem;
          margin-left: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .reminder-btn:hover {
          background: #d94426;
        }
      `}</style>
    </div>
  );
}

export default Notification;
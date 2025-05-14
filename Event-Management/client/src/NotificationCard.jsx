import React from 'react';
import './NotificationCard.css';

function NotificationCard({ notifications, onAccept, onDecline }) {
  return (
    <div className="notification-card-container">
      <h2>Notifications</h2>
      <div className="notification-cards">
        {notifications.map((notification, index) => (
          <div key={index} className="notification-card">
            {notification.type === 'invitation' && (
              <div className="notification-content">
                <p>
                  <strong>{notification.inviterName}</strong> invited you to event{' '}
                  <strong>{notification.eventTitle}</strong>
                </p>
                <div className="notification-actions">
                  <button className="accept-button" onClick={() => onAccept(notification.id)}>
                    Accept
                  </button>
                  <button className="decline-button" onClick={() => onDecline(notification.id)}>
                    Decline
                  </button>
                </div>
              </div>
            )}
            {notification.type === 'discussion' && (
              <div className="notification-content">
                <p>
                  <strong>{notification.userName}</strong> (Event: <strong>{notification.eventTitle}</strong>) messaged in event{' '}
                  <strong>{notification.eventTitle}</strong>
                </p>
              </div>
            )}
            {notification.type === 'event-update' && (
              <div className="notification-content">
                <p>
                  <strong>{notification.userName}</strong> updated event{' '}
                  <strong>{notification.eventTitle}</strong>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationCard;
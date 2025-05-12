import React from 'react';
import './Notification.css';

function Notification() {
  return (
    <div className="notification-container">
      <h1>Notifications</h1>
      <p>This is the Notifications page where you can view all your notifications.</p>
      <ul>
        <li>Notification 1: Event reminder</li>
        <li>Notification 2: New event added</li>
        <li>Notification 3: Event updated</li>
      </ul>
    </div>
  );
}

export default Notification;
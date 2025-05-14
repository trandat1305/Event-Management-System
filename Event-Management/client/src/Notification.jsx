import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationCard from './NotificationCard'; // Import the NotificationCard component
import './Notification.css'; // Optional: Add styles for the Notification page

function Notification() {
  const [isSidePanelOpen, setIsSidePanelOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  const notifications = [
    {
      id: 1,
      type: 'invitation',
      inviterName: 'Phong',
      eventTitle: 'Online Game',
    },
    {
      id: 2,
      type: 'discussion',
      userName: 'Hung',
      eventTitle: 'Gym',
    },
    {
      id: 3,
      type: 'event-update',
      userName: 'Dat',
      eventTitle: 'Deadline',
    },
    {
      id: 4,
      type: 'invitation',
      inviterName: 'Linh',
      eventTitle: 'Team Meeting',
    },
    {
      id: 5,
      type: 'event-update',
      userName: 'Trang',
      eventTitle: 'Project Launch',
    },
  ];

  const handleAccept = (id) => {
    console.log(`Accepted invitation with ID: ${id}`);
  };

  const handleDecline = (id) => {
    console.log(`Declined invitation with ID: ${id}`);
  };

  return (
    <div className="notification-container">
      <header className="header">
        <div className="header-left">
          <button className="toggle-button" onClick={toggleSidePanel}>
            <span>☰</span>
          </button>
        </div>
      </header>
      <div className={`side-panel ${isSidePanelOpen ? 'open' : ''}`}>
        <h2>Side Panel</h2>
        <ul>
          <li onClick={() => navigate('/home')}>Home</li>
          <li onClick={() => navigate('/home/myevents')}>My Events</li>
          <li onClick={() => navigate('/home/events')}>Events</li>
          <li onClick={() => navigate('/home/listevent')}>List Events</li>
        </ul>
      </div>
      {isSidePanelOpen && <div className="overlay" onClick={toggleSidePanel}></div>}
      <div className="notification-page">
        <NotificationCard
          notifications={notifications}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      </div>
    </div>
  );
}

export default Notification;
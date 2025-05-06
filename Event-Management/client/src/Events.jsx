import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Events.css';

function Events() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <div className="events-container">
      <button className="toggle-button" onClick={toggleSidePanel}>
        {isSidePanelOpen ? 'Close Panel' : 'Open Panel'}
      </button>
      <div className={`side-panel ${isSidePanelOpen ? 'open' : ''}`}>
        <h2>Side Panel</h2>
        <ul>
          <li onClick={() => navigate('/home/myevents')}>My Events</li>
          <li onClick={() => navigate('/home/events')}>Events</li>
          <li onClick={() => navigate('/home')}>Home</li>
        </ul>
      </div>
      {isSidePanelOpen && <div className="overlay" onClick={toggleSidePanel}></div>}
      <div className="content">
        <h1>Events</h1>
        <p>This is the Events page where you can explore all events.</p>
      </div>
    </div>
  );
}

export default Events;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <div className="home-container">
      <button className="toggle-button" onClick={toggleSidePanel}>
        {isSidePanelOpen ? 'Close Panel' : 'Open Panel'}
      </button>
      <div className={`side-panel ${isSidePanelOpen ? 'open' : ''}`}>
        <h2>Side Panel</h2>
        <ul>
          <li onClick={() => navigate('/home/myevents')}>My Events</li>
          <li onClick={() => navigate('/home/events')}>Events</li>
          <li onClick={() => navigate('/home')}>Home</li> {/* Navigate back to the homepage */}
        </ul>
      </div>
      {isSidePanelOpen && <div className="overlay" onClick={toggleSidePanel}></div>}
      <div className="content">
        <h1>Welcome to the Homepage</h1>
        <p>This is the homepage that appears after signing in.</p>
        <button className="create-button" onClick={() => navigate('/home/createevent')}>
          Create
        </button>
      </div>
    </div>
  );
}

export default Home;
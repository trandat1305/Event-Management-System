import React, { useState } from 'react';
import './Home.css'; // Add a CSS file for styling

function Home() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  const closeSidePanel = () => {
    setIsSidePanelOpen(false);
  };

  return (
    <div className="home-container">
      <button className="toggle-button" onClick={toggleSidePanel}>
        {isSidePanelOpen ? 'Close Panel' : 'Open Panel'}
      </button>
      <div className={`side-panel ${isSidePanelOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={closeSidePanel}>
          Close
        </button>
        <h2>Side Panel</h2>
        <ul>
          <li onClick={() => alert('Option 1 clicked')}>Option 1</li>
          <li onClick={() => alert('Option 2 clicked')}>Option 2</li>
          <li onClick={() => alert('Option 3 clicked')}>Option 3</li>
        </ul>
      </div>
      <div className="content">
        <h1>Welcome to the Homepage</h1>
        <p>This is the homepage that appears after signing in.</p>
      </div>
    </div>
  );
}

export default Home;
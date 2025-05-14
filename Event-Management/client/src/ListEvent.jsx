import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import ListEventCard from './ListEventCard'; // Import the ListEventCard component
import './ListEvent.css';

function ListEvent() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  // Sample events
  const events = [
    {
      id: 1,
      title: 'Online Game Night',
      description: 'Join us for an exciting online game night!',
      startTime: '2025-05-20T18:00:00',
      endTime: '2025-05-20T21:00:00',
      location: 'Online',
      imageURL: 'https://via.placeholder.com/300x150',
      isPublic: true,
      joined: false,
      creator: 'user1',
    },
    {
      id: 2,
      title: 'Yoga Session',
      description: 'Relax and rejuvenate with a yoga session.',
      startTime: '2025-05-22T08:00:00',
      endTime: '2025-05-22T09:30:00',
      location: 'Community Center',
      imageURL: 'https://via.placeholder.com/300x150',
      isPublic: true,
      joined: false,
      creator: 'user2',
    },
    {
      id: 3,
      title: 'Tech Meetup',
      description: 'Discuss the latest trends in technology.',
      startTime: '2025-05-25T14:00:00',
      endTime: '2025-05-25T17:00:00',
      location: 'Tech Hub',
      imageURL: 'https://via.placeholder.com/300x150',
      isPublic: true,
      joined: false,
      creator: 'user3',
    },
    {
      id: 4,
      title: 'Cooking Workshop',
      description: 'Learn to cook delicious meals.',
      startTime: '2025-05-28T10:00:00',
      endTime: '2025-05-28T13:00:00',
      location: 'Cooking Studio',
      imageURL: 'https://via.placeholder.com/300x150',
      isPublic: true,
      joined: false,
      creator: 'user4',
    },
    {
      id: 5,
      title: 'Art Exhibition',
      description: 'Explore stunning artwork by local artists.',
      startTime: '2025-05-30T16:00:00',
      endTime: '2025-05-30T19:00:00',
      location: 'Art Gallery',
      imageURL: 'https://via.placeholder.com/300x150',
      isPublic: true,
      joined: false,
      creator: 'user5',
    },
  ];

  const handleJoin = (id) => {
    console.log(`Joined event with ID: ${id}`);
  };

  return (
    <div className="list-event-container">
      <header className="header">
        <div className="header-left">
          <button className="toggle-button" onClick={toggleSidePanel}>
            <FaBars />
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
      <div className="list-event-content">
        <h1>List of Events</h1>
        <p>This is the ListEvent page where you can view and join all public events.</p>
        <ListEventCard events={events} onJoin={handleJoin} />
      </div>
    </div>
  );
}

export default ListEvent;
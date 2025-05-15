import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaMoon, FaBell, FaUserCircle } from 'react-icons/fa';
import ListEventCard from './ListEventCard';
import Profile from './Profile';
import EventDetails from './EventDetails';
import ListEventBackground from './assets/ListEventbackground.png';
import './ListEvent.css';

function ListEvent() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

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
    {
      id: 6,
      title: 'Team Meeting',
      description: 'This is a weekly team meeting to discuss project updates, address any issues, and plan for the upcoming week. All team members are expected to attend.',
      startTime: '2025-05-15T10:00:00',
      endTime: '2025-05-15T11:00:00',
      location: 'Conference Room A',
      imageURL: 'https://via.placeholder.com/300x150',
      isPublic: true,
      joined: false,
      creator: 'admin',
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
        <div className="header-right">
          <button className="icon-button">
            <FaMoon />
          </button>
          <button className="icon-button" onClick={() => navigate('/home/notification')}>
            <FaBell />
            <span className="notification-dot"></span>
          </button>
          <button className="create-button" onClick={() => navigate('/home/createevent')}>
            + Create
          </button>
          <button className="icon-button" onClick={toggleProfile}>
            <FaUserCircle />
          </button>
        </div>
      </header>
      <Profile isProfileOpen={isProfileOpen} toggleProfile={toggleProfile} />
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
      <div
        className="list-event-welcome-section"
        style={{ backgroundImage: `url(${ListEventBackground})` }}
      >
        <h1 className="list-event-welcome-message">List of Events</h1>
        <p className="list-event-welcome-description">
          This is the ListEvent page where you can view and join all public events.
        </p>
      </div>
      <div className="list-event-content">
        <ListEventCard events={events} onJoin={handleJoin} onSelectEvent={setSelectedEvent} />
      </div>
      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onJoin={handleJoin}
        />
      )}
    </div>
  );
}

export default ListEvent;
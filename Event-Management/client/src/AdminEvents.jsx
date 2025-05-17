import React, { useState } from 'react';
import { FaBars, FaMoon, FaSignOutAlt, FaHome, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AdminEventCard from './AdminEventCard';
import EventDetails from './EventDetails';
import EditEventDetails from './EditEventDetails';
import AdminBackground from './assets/AdminBackground.jpg';
import './AdminEvents.css';

function AdminEvents() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [events, setEvents] = useState([
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
      description: 'Weekly team meeting to discuss project updates.',
      startTime: '2025-05-15T10:00:00',
      endTime: '2025-05-15T11:00:00',
      location: 'Conference Room A',
      imageURL: 'https://via.placeholder.com/300x150',
      isPublic: true,
      joined: false,
      creator: 'admin',
    },
    {
      id: 7,
      title: 'Private Strategy Session',
      description: 'Closed-door meeting to plan Q3 objectives.',
      startTime: '2025-06-01T09:00:00',
      endTime: '2025-06-01T11:00:00',
      location: 'Boardroom B',
      imageURL: 'https://via.placeholder.com/300x150',
      isPublic: false,
      joined: false,
      creator: 'admin',
    },
    {
      id: 8,
      title: 'Exclusive Networking Event',
      description: 'Invitation-only networking for senior members.',
      startTime: '2025-06-03T18:30:00',
      endTime: '2025-06-03T21:00:00',
      location: 'Downtown Lounge',
      imageURL: 'https://via.placeholder.com/300x150',
      isPublic: false,
      joined: false,
      creator: 'user6',
    },
    {
      id: 9,
      title: 'Community Outreach',
      description: 'Public event to engage with local community.',
      startTime: '2025-06-05T10:00:00',
      endTime: '2025-06-05T14:00:00',
      location: 'City Park',
      imageURL: 'https://via.placeholder.com/300x150',
      isPublic: true,
      joined: false,
      creator: 'user7',
    },
  ]);

  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent({ ...event, isAdminView: true });
  };

  const handleEdit = (event) => {
    setEditEvent(event);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter((e) => e.id !== id));
    }
  };

  const handleSaveEdit = (updatedEvent) => {
    setEvents(
      events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
    );
    setEditEvent(null);
  };

  return (
    <div className="admin-events-container">
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
          <button className="icon-button" onClick={() => navigate('/login')}>
            <FaSignOutAlt />
          </button>
        </div>
      </header>
      <div className={`side-panel ${isSidePanelOpen ? 'open' : ''}`}>
        <h2 className="text-lg md:text-xl">Side Panel</h2>
        <ul>
          <li onClick={() => navigate('/admin')} className="text-sm md:text-base">
            <FaHome className="icon" />
            <span>Dashboard</span>
          </li>
          <li onClick={() => navigate('/admin/users')} className="text-sm md:text-base">
            <FaUser className="icon" />
            <span>Users</span>
          </li>
          <li onClick={() => navigate('/admin/events')} className="text-sm md:text-base">
            <FaCalendarAlt className="icon" />
            <span>Events</span>
          </li>
        </ul>
      </div>
      {isSidePanelOpen && (
        <div className={`overlay ${isSidePanelOpen ? 'visible' : ''}`} onClick={toggleSidePanel}></div>
      )}
      <div
        className="admin-events-welcome-section w-full h-[200px] bg-cover bg-center flex items-center justify-center p-2"
        style={{ backgroundImage: `url(${AdminBackground})` }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Event Management
        </h1>
      </div>
      <div className="content pt-4 px-4 flex flex-col items-center">
        <div className="admin-event-card-container">
          <AdminEventCard
            events={events}
            onSelectEvent={handleSelectEvent}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onJoin={() => {}} // Placeholder, as onJoin is not used in AdminEventCard
          isAdminView={selectedEvent.isAdminView}
        />
      )}
      {editEvent && (
        <EditEventDetails
          event={editEvent}
          onSave={handleSaveEdit}
          onClose={() => setEditEvent(null)}
        />
      )}
    </div>
  );
}

export default AdminEvents;
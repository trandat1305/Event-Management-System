import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle, FaPlus, FaCalendarAlt, FaCompass, FaBars, FaUsers } from 'react-icons/fa';
import './User.css';
import EventDetails from './EventDetails';
import Invite from './Invite';

function User() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedEventForInvite, setSelectedEventForInvite] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const participatingEvents = [
    {
      id: 1,
      title: 'React Conference',
      date: '2024-06-01',
      location: 'Online',
      discussionId: 101,
      role: 'attendee',
      description: 'A conference about React',
      startTime: '2024-06-01T09:00',
      endTime: '2024-06-01T17:00',
      isPublic: true,
      creator: 'Someone else',
      imageURL: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Music Festival',
      date: '2024-06-10',
      location: 'Central Park',
      discussionId: 102,
      role: 'attendee',
      description: 'A festival of music',
      startTime: '2024-06-10T11:00',
      endTime: '2024-06-10T22:00',
      isPublic: true,
      creator: 'Another person',
      imageURL: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Yoga class',
      date: '2025-05-20',
      location: 'Studio 2',
      discussionId: 103,
      role: 'attendee',
      description: 'Relaxing yoga session for all levels',
      startTime: '2025-05-210T06:00',
      endTime: '2025-05-20T07:00',
      isPublic: true,
      creator: 'User2',
      imageURL: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
    title: 'Workshop',
    date: '2025-05-23',
    location:'Lab',
    discussionId: 104,
    role: 'attendee',
    location: 'Lab',
    description: 'Hands-on workshop for new skills.',
    startTime: '2025-05-23T16:00:00',
    endTime: '2025-05-23T18:00:00',
    isPublic: true,
    creator: 'User2',
    imageURL: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
    title: 'Birthday Party',
    date: '2025-05-22',
    role: 'attendee',
    location: 'Cafe',
    discussionId: 105,
    description: 'Celebrate with friends!',
    startTime: '2025-05-22T08:00:00',
    endTime: '2025-05-22T10:00:00',
    isPublic: true,
    creator: 'User2',
    imageURL: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const organizingEvents = [
    {
      id: 10,
      title: 'Team Meeting',
      date: '2025-05-20',
      location: 'Room A',
      discussionId: 110,
      role: 'organizer',
      description: 'Discuss project updates and next steps',
      startTime: '2025-05-20T10:00',
      endTime: '2025-05-20T11:00',
      isPublic: true,
      creator: 'User1',
      imageURL: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 11,
      title: 'Project Kickoff',
      date: '2025-05-21',
      location: 'Room B',
      discussionId: 111,
      role: 'organizer',
      description: 'Kickoff meeting for new project',
      startTime: '2024-06-20T09:00',
      endTime: '2024-06-20T10:00',
      isPublic: true,
      creator: 'User1',
      imageURL: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 12,
      title: 'Strategy Session',
      date: '2025-05-23',
      location: 'Room C',
      discussionId: 112,
      role: 'organizer',
      description: 'Kickoff meeting for new project',
      startTime: '2025-05-23T14:00',
      endTime: '2025-05-23T15:30',
      isPublic: false,
      creator: 'User1',
      imageURL: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    },
  ];

  if (!token) {
    navigate('/home');
    return null;
  }

  const handleInvite = (event) => {
    setSelectedEventForInvite(event);
    setInviteModalOpen(true);
  };

  const openDiscussionModal = (event) => {
    setSelectedEvent({ ...event, type: event.role });
    setModalOpen(true);
  };

  const closeDiscussionModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="dashboard-container float-in-discover">
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-logo">Eventer</div>
        <nav className="sidebar-nav">
          <button onClick={() => navigate('/home/schedule')}><FaCalendarAlt /> Schedule</button>
          <button onClick={() => navigate('/discover')}><FaCompass /> Discover</button>
          <button onClick={() => navigate('/invitation')}><FaUsers /> Invitation</button>
        </nav>
      </aside>
      <div className={`main-content${sidebarOpen ? ' shifted' : ''}`}>
        <header className="top-nav">
          <div className="nav-left">
            <button className="icon-btn hamburger-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FaBars />
            </button>
            <span className="nav-logo">Dashboard</span>
          </div>
          <div className="nav-right">
            <button className="icon-btn" onClick={() => navigate('/home/notification')}>
              <FaBell />
            </button>
            <button className="create-event-btn" onClick={() => navigate('/createevent')}>
              + Create Event
            </button>
            <div className="user-profile">
              <span className="user-name">Hello, {user.username}!</span>
              <button className="edit-profile-btn" onClick={() => navigate('/myaccount')}>My Profile</button>
            </div>
          </div>
        </header>
        <div className="events-section">
          <div className="event-type">
            <h2>Organizing/Created Events</h2>
            <div className="events-row">
              {organizingEvents.map((event) => (
                <div key={event.id} className="event-card" onClick={() => openDiscussionModal(event)}>
                  <div className="event-image">
                    <img
                      src={event.imageURL || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'; }}
                      alt={event.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="event-details">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-date">Date: {event.date}</p>
                    <p className="event-location">Location: {event.location}</p>
                    <button
                      className="invite-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInvite(event);
                      }}
                    >
                      Invite
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="event-type">
            <h2>Participating Events</h2>
            <div className="events-row">
              {participatingEvents.map((event) => (
                <div key={event.id} className="event-card" onClick={() => openDiscussionModal(event)}>
                  <div className="event-image">
                    <img
                      src={event.imageURL || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'; }}
                      alt={event.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="event-details">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-date">Date: {event.date}</p>
                    <p className="event-location">Location: {event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {modalOpen && selectedEvent && (
          <EventDetails event={selectedEvent} onClose={closeDiscussionModal} />
        )}
        {inviteModalOpen && selectedEventForInvite && (
          <Invite
            eventId={selectedEventForInvite.id}
            onClose={() => setInviteModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default User;
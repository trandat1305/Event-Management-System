import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Schedule.css';
import EventDetails from './EventDetails';
import DiscussionBoard from './DiscussionBoard';

// Mock event data
const mockEvents = [
  {
    id: 1,
    title: 'Team Meeting',
    date: '2025-05-20',
    type: 'organizer',
    time: '10:00 - 11:00',
    location: 'Room A',
    description: 'Discuss project updates and next steps.',
    startTime: '2025-05-20T10:00:00',
    endTime: '2025-05-20T11:00:00',
    isPublic: true,
    creator: 'You',
    imageURL: '',
  },
  {
    id: 2,
    title: 'Yoga Class',
    date: '2025-05-20',
    type: 'participant',
    time: '18:00 - 19:00',
    location: 'Studio 2',
    description: 'Relaxing yoga session for all levels.',
    startTime: '2025-05-20T18:00:00',
    endTime: '2025-05-20T19:00:00',
    isPublic: true,
    creator: 'Alice',
    imageURL: '',
  },
  {
    id: 3,
    title: 'Project Kickoff',
    date: '2025-05-21',
    type: 'organizer',
    time: '09:00 - 10:00',
    location: 'Room B',
    description: 'Kickoff meeting for new project.',
    startTime: '2025-05-21T09:00:00',
    endTime: '2025-05-21T10:00:00',
    isPublic: false,
    creator: 'You',
    imageURL: '',
  },
  {
    id: 4,
    title: 'Birthday Party',
    date: '2025-05-22',
    type: 'participant',
    time: '20:00 - 22:00',
    location: 'Cafe',
    description: 'Celebrate with friends!',
    startTime: '2025-05-22T20:00:00',
    endTime: '2025-05-22T22:00:00',
    isPublic: true,
    creator: 'Bob',
    imageURL: '',
  },
  {
    id: 5,
    title: 'Strategy Session',
    date: '2025-05-23',
    type: 'organizer',
    time: '14:00 - 15:30',
    location: 'Room C',
    description: 'Planning for Q3 objectives.',
    startTime: '2025-05-23T14:00:00',
    endTime: '2025-05-23T15:30:00',
    isPublic: false,
    creator: 'You',
    imageURL: '',
  },
  {
    id: 6,
    title: 'Workshop',
    date: '2025-05-23',
    type: 'participant',
    time: '16:00 - 18:00',
    location: 'Lab',
    description: 'Hands-on workshop for new skills.',
    startTime: '2025-05-23T16:00:00',
    endTime: '2025-05-23T18:00:00',
    isPublic: true,
    creator: 'Carol',
    imageURL: '',
  },
];

function Schedule() {
  const [value, setValue] = useState(new Date());
  const [filter, setFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  // Helper: format date to yyyy-mm-dd
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Get events for a date
  const getEventsForDate = (date) => {
    const d = formatDate(date);
    if (filter === 'all') {
      // Only show days that have both types
      const hasOrg = mockEvents.some(e => e.date === d && e.type === 'organizer');
      const hasPar = mockEvents.some(e => e.date === d && e.type === 'participant');
      if (hasOrg && hasPar) {
        return mockEvents.filter(e => e.date === d);
      }
      return [];
    } else if (filter === 'organizer') {
      return mockEvents.filter(e => e.date === d && e.type === 'organizer');
    } else if (filter === 'participant') {
      return mockEvents.filter(e => e.date === d && e.type === 'participant');
    }
    return [];
  };

  // Calendar tile coloring
  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return '';
    const d = formatDate(date);
    const hasOrg = mockEvents.some(e => e.date === d && e.type === 'organizer');
    const hasPar = mockEvents.some(e => e.date === d && e.type === 'participant');
    if (filter === 'all') {
      if (hasOrg && hasPar) return 'purple-indicator';
      return '';
    }
    if (filter === 'organizer') {
      if (hasOrg && hasPar) return 'purple-indicator';
      if (hasOrg) return 'red-indicator';
      return '';
    }
    if (filter === 'participant') {
      if (hasOrg && hasPar) return 'purple-indicator';
      if (hasPar) return 'blue-indicator';
      return '';
    }
    return '';
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setSelectedDate(null);
  };

  // Handle date click
  const handleDateClick = (date) => {
    const events = getEventsForDate(date);
    if (events.length > 0) {
      setSelectedDate({ date: formatDate(date), events });
    } else {
      setSelectedDate(null);
    }
  };

  // Handle event click (open modal)
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // Handle close modal
  const handleCloseEventDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="schedule-container">
      <button className="schedule-back-btn" onClick={() => navigate('/user')}>
        <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Back
      </button>
      <div className="schedule-gradient-bg">
        <div className="schedule-card">
          <div className="schedule-header">
            <h1>Schedule</h1>
            <div className="filter-container">
              <label htmlFor="filter-select">Filter:</label>
              <select
                id="filter-select"
                value={filter}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="all">All Events</option>
                <option value="organizer">Organzining Events</option>
                <option value="participant">Attending Events</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Calendar
              onChange={setValue}
              value={value}
              tileClassName={tileClassName}
              onClickDay={handleDateClick}
            />
          </div>
          {selectedDate && (
            <div className="events-section">
              <h3>Events for {selectedDate.date}</h3>
              <ul>
                {selectedDate.events.map(ev => (
                  <li key={ev.id} style={{ marginBottom: 8, cursor: 'pointer' }} onClick={() => handleEventClick(ev)}>
                    <b>{ev.title}</b> <span style={{ color: ev.type === 'organizer' ? '#ff6b6b' : '#646cff' }}>
                      [{ev.type === 'organizer' ? 'Organizer' : 'Participant'}]
                    </span><br/>
                    <span>{ev.time} - {ev.location}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {selectedEvent && (
        <div className="event-details-modal-overlay">
          <EventDetails event={selectedEvent} onClose={handleCloseEventDetails} />
        </div>
      )}
    </div>
  );
}

export default Schedule;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Schedule.css';
import EventDetails from './EventDetails';
import DiscussionBoard from './DiscussionBoard';
import { useSelector } from 'react-redux';

function Schedule() {

  const [events, setEvents] = useState([]);

  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/users/events/attending', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();

      if (Array.isArray(data.events)) {
        const eventsWithExtras = data.events.map(e => ({
          ...e.event, // flatten event fields
          myEvent: e.myEvent,
          organizer: e.organizer,
          participantId: e._id,
          joinedAt: e.joinedAt,
          date: e.event.startTime ? e.event.startTime.slice(0, 10) : '', // yyyy-mm-dd
          time: e.event.startTime ? e.event.startTime.slice(11, 16) : '', // HH:mm
          type: (e.myEvent || e.organizer) ? 'organizer' : 'participant', // <-- updated logic
          id: e.event._id,
        }));
        setEvents(eventsWithExtras);
      } else {
        alert(data.error || 'Failed to get events');
      }
      } catch (error) {
        alert('Server error: ' + error.message);
      }
    };
    fetchEvents();
  }, [token, user._id]);

  const [value, setValue] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  // Helper: format date to yyyy-mm-dd
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Get events for a date
  const getEventsForDate = (date) => {
    const d = formatDate(date);
    return events.filter(e => e.date === d);
  };

  // Calendar tile coloring
  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return '';
    const d = formatDate(date);
    const hasOrg = events.some(e => e.date === d && e.type === 'organizer');
    const hasPar = events.some(e => e.date === d && e.type === 'participant');
    if (hasOrg && hasPar) return 'purple-indicator';
    if (hasOrg) return 'red-indicator';
    if (hasPar) return 'blue-indicator';
    return '';
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
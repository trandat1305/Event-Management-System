import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './Home.css';

function EventCard({ event, token }) {
  const onJoin = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/events/${eventId}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (response.ok) {
        alert('Successfully joined the event!');
      } else {
        alert(data.error || 'Failed to join the event');
      }
    } catch (error) {
      alert('Server error: ' + error.message);
    }
  };

  return (
    <div className="event-card">
      <div className="event-image">
        <img
          src={
            event.imageURL ||
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
          }
          alt={event.title}
        />
      </div>
      <div className="event-details">
        <h3>{event.title}</h3>
        <div className="event-info">
          <span>
            <FaCalendarAlt /> {new Date(event.startTime).toLocaleDateString()}
          </span>
          <span>
            <FaMapMarkerAlt /> {event.location}
          </span>
        </div>
        <div className="event-footer">
          <button className="book-now-btn" onClick={() => onJoin(event._id)}>
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
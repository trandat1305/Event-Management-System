import React from 'react';
import './EventCard.css';

function EventCard({ event }) {
  return (
    <div className={`event-card ${event.isMyEvent ? 'red-border' : 'blue-border'}`}>
      <h3 className="event-title">{event.title}</h3>
      <p className="event-description">{event.description}</p>
      <p className="event-time">
        <strong>Time:</strong> {event.time}
      </p>
    </div>
  );
}

export default EventCard;
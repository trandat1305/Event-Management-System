import React from 'react';
import './UpcomingEventCard.css';

function UpcomingEventCard({ events }) {
  return (
    <div className="upcoming-event-card-container">
      <h2>Upcoming Events</h2>
      <div className="upcoming-event-cards">
        {events.slice(0, 3).map((event, index) => (
          <div key={index} className="upcoming-event-card">
            <div
              className={`event-indicator ${
                event.type === 'my-event' ? 'my-event' : 'participating-event'
              }`}
            ></div>
            <div className="event-image">
              <img src={event.image} alt={event.title} />
            </div>
            <div className="event-details">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <p className="event-date-time">
                {event.date} at {event.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingEventCard;
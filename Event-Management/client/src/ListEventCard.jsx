import React from 'react';
import './ListEventCard.css';

function ListEventCard({ events, onJoin, onSelectEvent }) {
  return (
    <div className="list-event-card-container">
      <h2>Available Events</h2>
      <div className="list-event-cards-scrollable">
        {events.map((event, index) => (
          <div
            key={index}
            className="event-card blue-border"
          >
            <div className="event-image-placeholder">
              <img src={event.imageURL} alt={event.title} style={{ width: '50px', height: '50px' }} />
            </div>
            <div className="event-details">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <p className="event-date-time">
                {new Date(event.startTime).toLocaleTimeString()} -{' '}
                {new Date(event.endTime).toLocaleTimeString()}
              </p>
              <div className="event-buttons">
                <button className="join-button" onClick={() => onJoin(event.id)}>
                  Join
                </button>
                <button className="details-button" onClick={() => onSelectEvent(event)}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListEventCard;
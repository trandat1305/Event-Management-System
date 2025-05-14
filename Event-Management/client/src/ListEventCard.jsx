import React from 'react';
import './ListEventCard.css';

function ListEventCard({ events, onJoin }) {
  return (
    <div className="list-event-card-container">
      <h2>Available Events</h2>
      <div className="list-event-cards-scrollable">
        {events.map((event, index) => (
          <div key={index} className="list-event-card">
            <div className="event-image">
              <img src={event.imageURL} alt={event.title} />
            </div>
            <div className="event-details">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <p className="event-date-time">
                {new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}
              </p>
              <p className="event-location">Location: {event.location}</p>
              <button className="join-button" onClick={() => onJoin(event.id)}>
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListEventCard;
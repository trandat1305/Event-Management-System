import React from 'react';
import './EventDetails.css';

import DiscussionBoard from './DiscussionBoard'; // Kept as in original, though unused

function EventDetails({ event, onClose, onJoin, isAdminView = false }) {
  return (
    <div className="event-details-modal">
      <div className="event-details-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>{event.title}</h2>
        <img src={event.imageURL} alt={event.title} className="event-image" />
        <p>
          <strong>Description:</strong> {event.description}
        </p>
        <p>
          <strong>Start Time:</strong> {new Date(event.startTime).toLocaleString()}
        </p>
        <p>
          <strong>End Time:</strong> {new Date(event.endTime).toLocaleString()}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Public:</strong> {event.isPublic ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Creator:</strong> {event.creator}
        </p>
        <div className="event-details-buttons">
          <button className="back-button" onClick={onClose}>
            Back
          </button>
          {!isAdminView && (
            <button className="join-button" onClick={() => onJoin(event.id)}>
              Join
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
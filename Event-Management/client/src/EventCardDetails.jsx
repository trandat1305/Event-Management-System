import React from 'react';
import './EventCardDetails.css';

function EventCardDetails({ event, onEdit, onDelete, onLeave }) {
  const handleEdit = () => {
    if (onEdit) onEdit(event);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      if (onDelete) onDelete(event);
    }
  };

  const handleLeave = () => {
    if (window.confirm('Are you sure you want to leave this event?')) {
      if (onLeave) onLeave(event);
    }
  };

  return (
    <div className="event-card-details">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>
        <strong>Time:</strong> {event.startTime} - {event.endTime}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>
        <strong>Status:</strong> {event.isPublic ? 'Public' : 'Private'}
      </p>

      {event.isMyEvent ? (
        <div className="event-actions">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <div className="event-actions">
          <button onClick={handleLeave}>Leave</button>
        </div>
      )}
    </div>
  );
}

export default EventCardDetails;
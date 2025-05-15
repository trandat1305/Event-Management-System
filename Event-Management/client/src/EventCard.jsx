import React, { useState } from 'react';
import './EventCard.css';
import EventCardDetails from './EventCardDetails';
import EditEventDetails from './EditEventDetails';

function EventCard({ event, onDelete, onLeave, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isViewingDetails, setIsViewingDetails] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = (event) => {
    if (onDelete) onDelete(event);
  };

  const handleLeave = (event) => {
    if (onLeave) onLeave(event);
  };

  const handleSave = (updatedEvent) => {
    if (onSave) onSave(updatedEvent);
    setIsEditing(false);
  };

  return (
    <div
      className={`event-card ${event.isMyEvent ? 'red-border' : 'blue-border'}`}
      onClick={() => setIsViewingDetails(true)}
    >
      <h3 className="event-title">{event.title}</h3>
      <p className="event-description">{event.description}</p>
      <p className="event-time">
        <strong>Time:</strong> {event.startTime} - {event.endTime}
      </p>

      {isViewingDetails && (
        <EventCardDetails
          event={event}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onLeave={handleLeave}
        />
      )}

      {isEditing && (
        <EditEventDetails
          event={event}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default EventCard;
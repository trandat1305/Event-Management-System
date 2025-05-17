import React from 'react';
import './AdminEventCard.css';

function AdminEventCard({ events, onSelectEvent, onEdit, onDelete }) {
  return (
    <div className="admin-event-card-container">
      <h2 className="text-xl font-bold mb-4">Available Events</h2>
      <div className="admin-event-cards-scrollable">
        {events.map((event) => (
          <div
            key={event.id}
            className={`event-card ${event.isPublic ? 'border-blue' : 'border-red'}`}
          >
            <div className="event-image-placeholder">
              <img
                src={event.imageURL}
                alt={event.title}
                className="w-12 h-12 object-cover"
              />
            </div>
            <div className="event-details">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <p className="event-date-time">
                {new Date(event.startTime).toLocaleString()} -{' '}
                {new Date(event.endTime).toLocaleString()}
              </p>
              <div className="event-buttons flex gap-2">
                <button
                  className="view-button"
                  onClick={() => onSelectEvent(event)}
                >
                  View Details
                </button>
                <button
                  className="edit-button"
                  onClick={() => onEdit(event)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => onDelete(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminEventCard;
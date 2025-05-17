import React, { useState } from 'react';
import './EventDetails.css';
import DiscussionBoard from './DiscussionBoard';

function EventDetails({ event, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editEvent, setEditEvent] = useState({ ...event });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Ở đây bạn có thể gọi API cập nhật event nếu muốn
    setIsEditing(false);
    // Có thể gọi callback để cập nhật event ở ngoài nếu cần
  };

  return (
    <div className="event-details-modal float-in">
      <div className="event-details-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        {isEditing ? (
          <>
            <input
              className="event-edit-input"
              name="title"
              value={editEvent.title}
              onChange={handleEditChange}
              placeholder="Title"
            />
            <textarea
              className="event-edit-input"
              name="description"
              value={editEvent.description}
              onChange={handleEditChange}
              placeholder="Description"
            />
            <input
              className="event-edit-input"
              name="startTime"
              type="datetime-local"
              value={editEvent.startTime?.slice(0, 16) || ''}
              onChange={handleEditChange}
            />
            <input
              className="event-edit-input"
              name="endTime"
              type="datetime-local"
              value={editEvent.endTime?.slice(0, 16) || ''}
              onChange={handleEditChange}
            />
            <input
              className="event-edit-input"
              name="location"
              value={editEvent.location}
              onChange={handleEditChange}
              placeholder="Location"
            />
            <div className="event-details-buttons">
              <button className="join-button" onClick={handleSave}>Save</button>
              <button className="back-button" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h2>{editEvent.title}</h2>
            {editEvent.imageURL && <img src={editEvent.imageURL} alt={editEvent.title} className="event-image" />}
            <p>
              <strong>Description:</strong> {editEvent.description}
            </p>
            <p>
              <strong>Start Time:</strong> {new Date(editEvent.startTime).toLocaleString()}
            </p>
            <p>
              <strong>End Time:</strong> {new Date(editEvent.endTime).toLocaleString()}
            </p>
            <p>
              <strong>Location:</strong> {editEvent.location}
            </p>
            <p>
              <strong>Public:</strong> {editEvent.isPublic ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Creator:</strong> {editEvent.creator}
            </p>
            {event.type === 'organizer' && (
              <div className="event-details-buttons">
                <button className="join-button" onClick={() => setIsEditing(true)}>Edit</button>
              </div>
            )}
          </>
        )}
        <div className="event-details-discussion-wrapper">
          <DiscussionBoard eventId={event.id} />
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
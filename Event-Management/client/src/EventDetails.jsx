import React, { useState } from 'react';
import './EventDetails.css';
import DiscussionBoard from './DiscussionBoard';

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function EventDetails({ event, onClose }) {
  // State to toggle between view and edit modes
  const [isEditing, setIsEditing] = useState(false);
  // State to hold the editable event data, initialized with the event prop
  const [editEvent, setEditEvent] = useState({ ...event });

  // Handle changes in the edit form inputs
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEvent((prev) => ({ ...prev, [name]: value }));
  };

  // Handle saving the edited event
  const handleSave = () => {
    // In a real application, you might call an API here to update the event
    setIsEditing(false);
    // Optionally, a callback like onUpdate could be called to propagate changes
  };

  return (
    <div className="event-details-modal float-in">
      <div className="event-details-content">
        {/* Close button to exit the modal */}
        <button className="close-button" onClick={onClose}>
          Close
        </button>

        {isEditing ? (
          // Edit mode: Form to edit event details
          <>
            <h2 className="edit-event-title">Edit Event</h2>
            <form
              className="edit-event-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="form-group">
                <label htmlFor="edit-title">Event Title</label>
                <input
                  id="edit-title"
                  className="event-edit-input"
                  name="title"
                  value={editEvent.title}
                  onChange={handleEditChange}
                  placeholder="Enter event title"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-description">Description</label>
                <textarea
                  id="edit-description"
                  className="event-edit-input"
                  name="description"
                  value={decodeHtml(editEvent.description)}
                  onChange={handleEditChange}
                  placeholder="Describe the event"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edit-start">Start Time</label>
                  <input
                    id="edit-start"
                    className="event-edit-input"
                    name="startTime"
                    type="datetime-local"
                    value={editEvent.startTime?.slice(0, 16) || ''}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-end">End Time</label>
                  <input
                    id="edit-end"
                    className="event-edit-input"
                    name="endTime"
                    type="datetime-local"
                    value={editEvent.endTime?.slice(0, 16) || ''}
                    onChange={handleEditChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="edit-location">Location</label>
                <input
                  id="edit-location"
                  className="event-edit-input"
                  name="location"
                  value={editEvent.location}
                  onChange={handleEditChange}
                  placeholder="Enter location"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-image">Image URL</label>
                <input
                  id="edit-image"
                  className="event-edit-input"
                  name="imageURL"
                  value={editEvent.imageURL || ''}
                  onChange={handleEditChange}
                  placeholder="Enter image URL"
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  Save
                </button>
              </div>
            </form>
          </>
        ) : (
          // View mode: Display event details
          <>
            <h2>{decodeHtml(editEvent.title)}</h2>
            {editEvent.imageURL && (
              <img
                src={editEvent.imageURL}
                alt={editEvent.title}
                className="event-image"
              />
            )}
            <p>
              <strong>Description:</strong> {decodeHtml(editEvent.description)}
            </p>
            <p>
              <strong>Start Time:</strong>{' '}
              {new Date(editEvent.startTime).toLocaleString()}
            </p>
            <p>
              <strong>End Time:</strong>{' '}
              {new Date(editEvent.endTime).toLocaleString()}
            </p>
            <p>
              <strong>Location:</strong> {decodeHtml(editEvent.location)}
            </p>
            <p>
              <strong>Public:</strong> {editEvent.isPublic ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Creator:</strong> {decodeHtml(editEvent.creator.username)}
            </p>
            {/* Show Edit button only if the user is the organizer */}
            {event.type === 'organizer' && (
              <div className="event-details-buttons">
                <button
                  className="join-button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              </div>
            )}
          </>
        )}
        {/* Discussion board section */}
        <div className="event-details-discussion-wrapper">
          <DiscussionBoard eventId={event.id} />
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
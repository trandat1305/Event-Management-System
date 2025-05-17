import React, { useState } from 'react';
import './EditEventDetails.css';

function EditEventDetails({ event, onClose, onSave }) {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [startTime, setStartTime] = useState(event.startTime.slice(0, 16));
  const [endTime, setEndTime] = useState(event.endTime.slice(0, 16));
  const [location, setLocation] = useState(event.location);
  const [imageURL, setImageURL] = useState(event.imageURL || '');
  const [isPublic, setIsPublic] = useState(event.isPublic);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Title is required.');
      return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
      alert('End time must be after start time.');
      return;
    }

    if (!imageURL.trim()) {
      alert('Image URL is required.');
      return;
    }

    const updatedEvent = {
      ...event,
      title,
      description,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      location,
      imageURL,
      isPublic,
    };

    if (onSave) onSave(updatedEvent);
    onClose();
  };

  return (
    <div className="edit-event-details-overlay">
      <div className="edit-event-details">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <strong>Title</strong>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <strong>Description</strong>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <strong>Start Time</strong>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="form-input"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <strong>End Time</strong>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="form-input"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <strong>Location</strong>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-input"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <strong>Image URL</strong>
              <input
                type="url"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                className="form-input"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <strong>Public</strong>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="form-checkbox"
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="save-button">
              Save
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEventDetails;
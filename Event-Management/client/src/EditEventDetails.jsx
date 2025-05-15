import React, { useState } from 'react';
import './EditEventDetails.css';

function EditEventDetails({ event, onClose, onSave }) {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);
  const [location, setLocation] = useState(event.location);
  const [isPublic, setIsPublic] = useState(event.isPublic);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Title is required.');
      return;
    }

    if (startTime >= endTime) {
      alert('End time must be after start time.');
      return;
    }

    const updatedEvent = {
      ...event,
      title,
      description,
      startTime,
      endTime,
      location,
      isPublic,
    };

    if (onSave) onSave(updatedEvent);
    onClose();
  };

  return (
    <div className="edit-event-details-overlay">
      <div className="edit-event-details">
        <h2>Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Public or Private</label>
            <select
              value={isPublic}
              onChange={(e) => setIsPublic(e.target.value === 'true')}
              required
            >
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEventDetails;
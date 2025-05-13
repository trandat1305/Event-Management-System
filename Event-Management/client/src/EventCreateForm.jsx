import React, { useState } from 'react';
import './EventCreateForm.css';

function EventCreateForm({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { title, description, time };
    onCreate(newEvent); // Pass the new event to the parent component
    onClose(); // Close the form
  };

  return (
    <div className="event-create-form-overlay">
      <div className="event-create-form">
        <h2>Create New Event</h2>
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
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventCreateForm;
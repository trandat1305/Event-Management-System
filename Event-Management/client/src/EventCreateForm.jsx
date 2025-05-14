import React, { useState } from 'react';
import './EventCreateForm.css';

function EventCreateForm({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); // Optional field
  const [date, setDate] = useState(''); // Single text field for date
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isPublic, setIsPublic] = useState(true); // Default to public
  const [participants, setParticipants] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure the title is filled
    if (!title.trim()) {
      alert('Title is required.');
      return;
    }

    // Validate the date format (DD/MM/YYYY)
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(date)) {
      alert('Please enter a valid date in the format DD/MM/YYYY.');
      return;
    }

    // Extract day, month, and year from the date
    const [day, month, year] = date.split('/').map(Number);

    // Validate day, month, and year ranges
    if (month < 1 || month > 12) {
      alert('Month must be between 1 and 12.');
      return;
    }
    if (year < 1900 || year > 2100) {
      alert('Year must be between 1900 and 2100.');
      return;
    }

    // Check if the date is valid using the Date object
    const isValidDate = (d, m, y) => {
      const dateObj = new Date(y, m - 1, d); // Month is 0-indexed in JavaScript
      return (
        dateObj.getFullYear() === y &&
        dateObj.getMonth() === m - 1 &&
        dateObj.getDate() === d
      );
    };

    if (!isValidDate(day, month, year)) {
      alert('The date you entered is not valid.');
      return;
    }

    // Validate start time and end time
    if (!startTime || !endTime) {
      alert('Start time and end time are required.');
      return;
    }

    if (startTime >= endTime) {
      alert('End time must be after start time.');
      return;
    }

    // Validate number of participants
    const participantsNumber = parseInt(participants, 10);
    if (isNaN(participantsNumber) || participantsNumber < 0) {
      alert('Number of participants must be 0 or a positive natural number.');
      return;
    }

    // Check if the event is in the past
    const eventDateTime = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${startTime}`);
    const currentDateTime = new Date();

    if (eventDateTime < currentDateTime) {
      alert('You cannot set an event in the past.');
      return;
    }

    const newEvent = {
      title,
      description, // Optional field
      date: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`,
      startTime,
      endTime,
      isPublic,
      participants: participantsNumber,
    };

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
            <label>Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Date (DD/MM/YYYY)</label>
            <input
              type="text"
              placeholder="DD/MM/YYYY"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
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
          <div className="form-group">
            <label>Number of Participants</label>
            <input
              type="number"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              min="0"
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
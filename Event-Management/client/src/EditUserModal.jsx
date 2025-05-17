import React, { useState } from 'react';
import './EditUserModal.css';

function EditUserModal({ user, onSave, onClose }) {
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState(user.password);
  const [eventsAttended, setEventsAttended] = useState(user.eventsAttended);
  const [eventsCreated, setEventsCreated] = useState(user.eventsCreated);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Name is required.');
      return;
    }

    if (!password.trim()) {
      alert('Password is required.');
      return;
    }

    if (eventsAttended < 0) {
      alert('Events Attended cannot be negative.');
      return;
    }

    if (eventsCreated < 0) {
      alert('Events Organized cannot be negative.');
      return;
    }

    const updatedUser = {
      ...user,
      name,
      password,
      eventsAttended,
      eventsCreated,
    };

    if (onSave) onSave(updatedUser);
    onClose();
  };

  return (
    <div className="edit-user-modal-overlay">
      <div className="edit-user-modal">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <strong>ID (Read-only)</strong>
              <input type="text" value={user.id} className="form-input" disabled />
            </label>
          </div>
          <div className="form-group">
            <label>
              <strong>Name</strong>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <strong>Email (Read-only)</strong>
              <input type="email" value={user.email} className="form-input" disabled />
            </label>
          </div>
          <div className="form-group">
            <label>
              <strong>Password</strong>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <strong>Events Attended</strong>
              <input
                type="number"
                value={eventsAttended}
                onChange={(e) => setEventsAttended(Number(e.target.value))}
                className="form-input"
                min="0"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <strong>Events Organized</strong>
              <input
                type="number"
                value={eventsCreated}
                onChange={(e) => setEventsCreated(Number(e.target.value))}
                className="form-input"
                min="0"
                required
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

export default EditUserModal;
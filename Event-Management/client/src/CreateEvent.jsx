import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaImage, FaLock, FaGlobe } from 'react-icons/fa';
import './CreateEvent.css';

function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    location: '',
    image: null,
    isPublic: undefined
  });
  const [dateError, setDateError] = useState('');
  const [visibilityError, setVisibilityError] = useState('');
  const [imageError, setImageError] = useState('');

  const validateDates = () => {
    if (formData.startDate && formData.endDate && formData.startTime && formData.endTime) {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
      
      if (endDateTime <= startDateTime) {
        if (formData.startDate === formData.endDate) {
          const startTimeParts = formData.startTime.split(':').map(Number);
          const endTimeParts = formData.endTime.split(':').map(Number);
          
          const startMinutes = startTimeParts[0] * 60 + startTimeParts[1];
          const endMinutes = endTimeParts[0] * 60 + endTimeParts[1];
          
          if (startMinutes >= endMinutes) {
            setDateError('End time must be after start time on the same day');
            return false;
          }
        } else {
          setDateError('End date must be after start date');
          return false;
        }
      }
    }
    setDateError('');
    return true;
  };

  const validateVisibility = () => {
    if (formData.isPublic === undefined) {
      setVisibilityError('Please select event visibility (Public or Private)');
      return false;
    }
    setVisibilityError('');
    return true;
  };

  const validateImage = () => {
    if (!formData.image) {
      setImageError('Please upload an event image');
      return false;
    }
    setImageError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isDatesValid = validateDates();
    const isVisibilityValid = validateVisibility();
    const isImageValid = validateImage();
    if (isDatesValid && isVisibilityValid && isImageValid) {
      console.log('Event creation:', formData);
      // Handle event creation logic here
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    validateImage();
  };

  return (
    <div className="create-event-container">
      <div className="create-event-card">
        <div className="create-event-header">
          <h1>Create New Event</h1>
          <p>Fill in the details to create your event</p>
        </div>

        <form onSubmit={handleSubmit} className="create-event-form">
          <div className="form-group">
            <label>Event Title *</label>
            <input
              type="text"
              placeholder="Enter event title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Describe your event..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><FaCalendarAlt /> Start Date *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => {
                  setFormData({...formData, startDate: e.target.value});
                  validateDates();
                }}
                required
              />
            </div>

            <div className="form-group">
              <label><FaClock /> Start Time *</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => {
                  setFormData({...formData, startTime: e.target.value});
                  validateDates();
                }}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><FaCalendarAlt /> End Date *</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => {
                  setFormData({...formData, endDate: e.target.value});
                  validateDates();
                }}
                required
              />
            </div>

            <div className="form-group">
              <label><FaClock /> End Time *</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => {
                  setFormData({...formData, endTime: e.target.value});
                  validateDates();
                }}
                required
              />
            </div>
          </div>

          {dateError && (
            <div className="error-message">
              {dateError}
            </div>
          )}

          <div className="form-group">
            <label><FaMapMarkerAlt /> Location *</label>
            <input
              type="text"
              placeholder="Enter event location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Event Visibility *</label>
            <div className={`visibility-toggle ${visibilityError ? 'invalid' : ''}`}>
              <label className="visibility-option">
                <input
                  type="radio"
                  name="visibility"
                  checked={formData.isPublic === true}
                  onChange={() => {
                    setFormData({...formData, isPublic: true});
                    validateVisibility();
                  }}
                />
                <FaGlobe /> Public
              </label>
              <label className="visibility-option">
                <input
                  type="radio"
                  name="visibility"
                  checked={formData.isPublic === false}
                  onChange={() => {
                    setFormData({...formData, isPublic: false});
                    validateVisibility();
                  }}
                />
                <FaLock /> Private
              </label>
            </div>
            {visibilityError && (
              <div className="error-message">
                {visibilityError}
              </div>
            )}
          </div>

          <div className="form-group">
            <label><FaImage /> Event Image *</label>
            <div className={`image-upload ${imageError ? 'invalid' : ''}`}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {formData.image && (
                <div className="image-preview">
                  <img src={URL.createObjectURL(formData.image)} alt="Preview" />
                </div>
              )}
            </div>
            {imageError && (
              <div className="error-message">
                {imageError}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => navigate('/user')}>
              Cancel
            </button>
            <button type="submit" className="create-button">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
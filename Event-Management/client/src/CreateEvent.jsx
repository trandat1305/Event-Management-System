import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaImage, FaTag, FaDollarSign } from 'react-icons/fa';
import './CreateEvent.css';

function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    price: '',
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle event creation logic here
    console.log('Event creation:', formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
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
            <label>Event Title</label>
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
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><FaCalendarAlt /> Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label><FaClock /> Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label><FaMapMarkerAlt /> Location</label>
            <input
              type="text"
              placeholder="Enter event location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><FaTag /> Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
              >
                <option value="">Select category</option>
                <option value="music">Music</option>
                <option value="technology">Technology</option>
                <option value="food">Food & Drink</option>
                <option value="sports">Sports</option>
                <option value="arts">Arts</option>
                <option value="business">Business</option>
              </select>
            </div>

            <div className="form-group">
              <label><FaDollarSign /> Price</label>
              <input
                type="number"
                placeholder="Enter ticket price"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label><FaImage /> Event Image</label>
            <div className="image-upload">
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
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => navigate('/home')}>
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
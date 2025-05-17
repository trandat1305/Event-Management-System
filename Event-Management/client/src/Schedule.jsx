import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Schedule.css';

function Schedule() {
  const [value, setValue] = useState(new Date());
  const navigate = useNavigate();

  return (
    <div className="schedule-container">
      <button className="schedule-back-btn" onClick={() => navigate('/user')}>
        <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Back
      </button>
      <div className="schedule-gradient-bg">
        <div className="schedule-card">
          <div className="schedule-header">
            <h1>Schedule</h1>
            <div className="filter-container">
              <label htmlFor="filter-select">Filter:</label>
              <select id="filter-select" className="filter-select">
                <option value="all">All Events</option>
                <option value="myevent">My Events</option>
                <option value="events">Events</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Calendar
              onChange={setValue}
              value={value}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
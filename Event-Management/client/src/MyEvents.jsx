import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBars, FaMoon, FaBell, FaUserCircle, FaCalendarAlt } from 'react-icons/fa';
import Profile from './Profile';
import './MyEvents.css';

function MyEvents() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarDays, setCalendarDays] = useState([]);
  const [monthYear, setMonthYear] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [realCurrentDay, setRealCurrentDay] = useState(new Date().getDate());
  const [realCurrentMonth, setRealCurrentMonth] = useState(new Date().getMonth());
  const [realCurrentYear, setRealCurrentYear] = useState(new Date().getFullYear());

  const calendarRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setSelectedDate(null);
    }
  };

  const generateCalendar = React.useCallback(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    setMonthYear(`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`);

    const daysArray = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    setCalendarDays(daysArray);
  }, [currentMonth, currentYear]);

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  useEffect(() => {
    generateCalendar();
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [currentMonth, currentYear, generateCalendar]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setRealCurrentDay(now.getDate());
      setRealCurrentMonth(now.getMonth());
      setRealCurrentYear(now.getFullYear());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-events-container">
      <header className="my-events-header">
        <div className="my-events-header-left">
          <button className="my-events-toggle-button" onClick={toggleSidePanel}>
            <FaBars />
          </button>
        </div>
        <div className="my-events-header-right">
          <button className="my-events-icon-button">
            <FaMoon />
          </button>
          <button className="my-events-icon-button" onClick={() => navigate('/home/notification')}>
            <FaBell />
            <span className="my-events-notification-dot"></span>
          </button>
          <button className="my-events-create-button" onClick={() => navigate('/home/createevent')}>
            + Create
          </button>
          <button className="my-events-icon-button" onClick={toggleProfile}>
            <FaUserCircle />
          </button>
        </div>
      </header>
      <Profile isProfileOpen={isProfileOpen} toggleProfile={toggleProfile} />
      <div className={`my-events-side-panel ${isSidePanelOpen ? 'open' : ''}`}>
        <h2>Side Panel</h2>
        <ul>
          <li onClick={() => navigate('/home')}>Home</li>
          <li onClick={() => navigate('/home/myevents')}>My Events</li>
          <li onClick={() => navigate('/home/events')}>Events</li>
        </ul>
      </div>
      {isSidePanelOpen && <div className="my-events-overlay" onClick={toggleSidePanel}></div>}
      <div className="my-events-welcome-section">
        <h1 className="my-events-welcome-message">My Events</h1>
      </div>
      <div className="my-events-content">
        <div className="my-events-sections-wrapper">
          <div className="my-events-events-section">
            <h2>Your events are:</h2>
            <div className="my-events-event-card">
              <div className="my-events-event-image-placeholder"></div>
              <div className="my-events-event-details">
                <h3>Event Title</h3>
                <p>Details about your event. Customize this as needed.</p>
                <div className="my-events-event-buttons">
                  <button className="my-events-complete-button">Complete</button>
                  <button className="my-events-delete-button">Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div className="my-events-calendar-section">
            <h2>
              <FaCalendarAlt className="my-events-calendar-icon" /> Schedule:
              <Link to="/home/schedule" className="my-events-schedule-link">View Full Schedule</Link>
            </h2>
            <div className="my-events-calendar-header">
              <button className="my-events-calendar-nav" onClick={handlePreviousMonth}>
                &lt; Previous
              </button>
              <h2>{monthYear}</h2>
              <button className="my-events-calendar-nav" onClick={handleNextMonth}>
                Next &gt;
              </button>
            </div>
            <div className="my-events-calendar-days">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
            <div className="my-events-calendar" ref={calendarRef}>
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`my-events-calendar-date ${
                    day && selectedDate === day ? 'selected' : ''
                  } ${
                    day &&
                    day === realCurrentDay &&
                    currentMonth === realCurrentMonth &&
                    currentYear === realCurrentYear
                      ? 'current-day'
                      : ''
                  } ${day === null ? 'empty' : ''}`}
                  onClick={() => day && handleDateClick(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyEvents;
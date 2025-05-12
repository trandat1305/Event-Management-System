import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaMoon, FaBell, FaUserCircle, FaCalendarAlt } from 'react-icons/fa';
import Profile from './Profile'; // Import the Profile component
import './Home.css';

function Home() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Track if the profile is open
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarDays, setCalendarDays] = useState([]);
  const [monthYear, setMonthYear] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [realCurrentDay, setRealCurrentDay] = useState(new Date().getDate());
  const [realCurrentMonth, setRealCurrentMonth] = useState(new Date().getMonth());
  const [realCurrentYear, setRealCurrentYear] = useState(new Date().getFullYear());
  const [eventDates] = useState([20, 31]); // Example event dates

  const calendarRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen); // Toggle the profile overlay
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

  const userId = "131136";

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-left">
          <button className="toggle-button" onClick={toggleSidePanel}>
            <FaBars />
          </button>
        </div>
        <div className="header-right">
          <button className="icon-button"><FaMoon /></button>
          <button className="icon-button">
            <FaBell />
            <span className="notification-dot"></span>
          </button>
          <button className="create-button" onClick={() => navigate('/home/createevent')}>
            + Create
          </button>
          <button className="icon-button" onClick={toggleProfile}>
            <FaUserCircle />
          </button>
        </div>
      </header>
      <Profile isProfileOpen={isProfileOpen} toggleProfile={toggleProfile} />
      <div className={`side-panel ${isSidePanelOpen ? 'open' : ''}`}>
        <h2>Side Panel</h2>
        <ul>
          <li onClick={() => navigate('/home')}>Home</li>
          <li onClick={() => navigate('/home/myevents')}>My Events</li>
          <li onClick={() => navigate('/home/events')}>Events</li>
        </ul>
      </div>
      {isSidePanelOpen && <div className="overlay" onClick={toggleSidePanel}></div>}
      <div className="content">
        <h1 className="welcome-message">WELCOME, User{userId}</h1>
        <div className="sections-wrapper">
          <div className="events-section">
            <h2>Your upcoming events are:</h2>
            <div className="event-card">
              <div className="event-image-placeholder"></div>
              <div className="event-details">
                <h3>Title</h3>
                <p>Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</p>
                <div className="event-buttons">
                  <button className="complete-button">Complete</button>
                  <button className="delete-button">Delete</button>
                </div>
              </div>
            </div>
            <div className="event-card">
              <div className="event-image-placeholder"></div>
              <div className="event-details">
                <h3>Title</h3>
                <p>Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.</p>
                <div className="event-buttons">
                  <button className="complete-button">Complete</button>
                  <button className="delete-button">Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div className="calendar-section">
            <h2><FaCalendarAlt className="calendar-icon" /> Schedule:</h2>
            <div className="calendar-header">
              <button className="calendar-nav" onClick={handlePreviousMonth}>
                &lt; Previous
              </button>
              <h2>{monthYear}</h2>
              <button className="calendar-nav" onClick={handleNextMonth}>
                Next &gt;
              </button>
            </div>
            <div className="calendar-days">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
            <div className="calendar" ref={calendarRef}>
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`calendar-date ${
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

export default Home;
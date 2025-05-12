import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // Track the selected date
  const [calendarDays, setCalendarDays] = useState([]); // Store days of the current month
  const [monthYear, setMonthYear] = useState(''); // Store the current month and year
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Track the displayed month
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Track the displayed year

  // Track the real current date
  const [realCurrentDay, setRealCurrentDay] = useState(new Date().getDate());
  const [realCurrentMonth, setRealCurrentMonth] = useState(new Date().getMonth());
  const [realCurrentYear, setRealCurrentYear] = useState(new Date().getFullYear());

  const calendarRef = useRef(null); // Reference to the calendar container
  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen); // Toggle the profile overlay
  };

  const handleDateClick = (date) => {
    setSelectedDate(date); // Set the clicked date as selected
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setSelectedDate(null); // Clear the selected date if clicked outside
    }
  };

  const generateCalendar = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Day of the week (0 = Sunday)
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Total days in the month

    setMonthYear(`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`); // Set month and year

    const daysArray = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null); // Add empty slots for days before the first day
    }
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i); // Add days of the month
    }
    setCalendarDays(daysArray);
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11); // Go to December of the previous year
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0); // Go to January of the next year
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  useEffect(() => {
    generateCalendar();

    // Add event listener for clicks outside the calendar
    document.addEventListener('click', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [currentMonth, currentYear]); // Regenerate calendar when month or year changes

  useEffect(() => {
    // Update the real current date every minute
    const interval = setInterval(() => {
      const now = new Date();
      setRealCurrentDay(now.getDate());
      setRealCurrentMonth(now.getMonth());
      setRealCurrentYear(now.getFullYear());
    }, 60000); // Check every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="home-container">
      <button className="toggle-button" onClick={toggleSidePanel}>
        {isSidePanelOpen ? 'Close Panel' : 'Open Panel'}
      </button>
      <div className={`side-panel ${isSidePanelOpen ? 'open' : ''}`}>
        <h2>Side Panel</h2>
        <ul>
          <li onClick={() => navigate('/home/myevents')}>My Events</li>
          <li onClick={() => navigate('/home/events')}>Events</li>
          <li onClick={() => navigate('/home')}>Home</li>
        </ul>
      </div>
      {isSidePanelOpen && <div className="overlay" onClick={toggleSidePanel}></div>}
      <div className="content">
        <h1>Welcome to the Homepage</h1>
        <p>This is the homepage that appears after signing in.</p>
        <button className="create-button" onClick={() => navigate('/home/createevent')}>
          Create
        </button>
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
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
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
              onClick={() => day && handleDateClick(day)} // Ensure only valid dates are clickable
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './Schedule.css';

function Schedule() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarDays, setCalendarDays] = useState([]);
  const [monthYear, setMonthYear] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [realCurrentDay, setRealCurrentDay] = useState(new Date().getDate());
  const [realCurrentMonth, setRealCurrentMonth] = useState(new Date().getMonth());
  const [realCurrentYear, setRealCurrentYear] = useState(new Date().getFullYear());
  const [filter, setFilter] = useState('all'); // Add filter state
  const calendarRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Set filter based on the URL path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/home/schedule') {
      setFilter('all');
    } else if (path === '/home/myevent/schedule') {
      setFilter('myevent');
    } else if (path === '/home/events/schedule') {
      setFilter('events');
    }
  }, [location.pathname]);

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const generateCalendar = React.useCallback(() => {
    const firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    setMonthYear(`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`);

    const daysArray = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null); // Empty cells for alignment
    }
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i); // Actual days of the month
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

  useEffect(() => {
    const calendarNode = calendarRef.current;
    const handleClickOutside = (event) => {
      if (calendarNode && !calendarNode.contains(event.target)) {
        setSelectedDate(null); // Unselect the date if clicked outside
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Dummy logic to demonstrate filtering (replace with actual event data filtering)
  const filteredEvents = () => {
    if (filter === 'all') {
      return 'Showing all events for the selected date.';
    } else if (filter === 'myevent') {
      return 'Showing only your events for the selected date.';
    } else if (filter === 'events') {
      return 'Showing other events for the selected date.';
    }
  };

  return (
    <div className="schedule-container">
      <header className="header">
        <div className="header-left">
          <button className="toggle-button" onClick={toggleSidePanel}>
            <FaBars />
          </button>
        </div>
      </header>
      <div className={`side-panel ${isSidePanelOpen ? 'open' : ''}`}>
        <h2>Side Panel</h2>
        <ul>
          <li onClick={() => navigate('/home')}>Home</li>
          <li onClick={() => navigate('/home/myevent')}>My Events</li>
          <li onClick={() => navigate('/home/events')}>Events</li>
          <li onClick={() => navigate('/home/listevent')}>List Events</li>
        </ul>
      </div>
      {isSidePanelOpen && <div className="overlay" onClick={toggleSidePanel}></div>}
      <h1>Schedule</h1>
      <p>Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}</p> {/* Display the current filter */}
      <div className="calendar-section">
        <h2>{monthYear}</h2>
        <div className="calendar-header">
          <button className="calendar-nav" onClick={handlePreviousMonth}>
            &lt; Previous
          </button>
          <h2>{monthYear}</h2>
          <button className="calendar-nav" onClick={handleNextMonth}>
            Next &gt;
          </button>
        </div>
        <table className="calendar-table">
          <thead>
            <tr>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>
          </thead>
        </table>
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
              {day || ''}
            </div>
          ))}
        </div>
      </div>
      {selectedDate && (
        <div className="filtered-events">
          <h3>Events for {selectedDate} {monthYear}</h3>
          <p>{filteredEvents()}</p>
        </div>
      )}
    </div>
  );
}

export default Schedule;
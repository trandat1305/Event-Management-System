import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBars, FaMoon, FaBell, FaUserCircle, FaCalendarAlt } from 'react-icons/fa';
import Profile from './Profile';
import UpcomingEventCard from './UpcomingEventCard'; // Import the UpcomingEventCard component
import './Events.css';

function Events() {
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

  // Sample event data for UpcomingEventCard
  const events = [
    {
      title: 'Event 1',
      description: 'Description for Event 1',
      date: '2025-05-20',
      time: '10:00 AM',
      image: 'https://via.placeholder.com/300x150',
      type: 'participating-event', // Marked as "Event" (blue)
    },
    {
      title: 'Event 2',
      description: 'Description for Event 2',
      date: '2025-05-22',
      time: '2:00 PM',
      image: 'https://via.placeholder.com/300x150',
      type: 'participating-event', // Marked as "Event" (blue)
    },
    {
      title: 'Event 3',
      description: 'Description for Event 3',
      date: '2025-05-25',
      time: '6:00 PM',
      image: 'https://via.placeholder.com/300x150',
      type: 'participating-event', // Marked as "Event" (blue)
    },
  ];

  return (
    <div className="events-container">
      <header className="header">
        <div className="header-left">
          <button className="toggle-button" onClick={toggleSidePanel}>
            <FaBars />
          </button>
        </div>
        <div className="header-right">
          <button className="icon-button"><FaMoon /></button>
          <button className="icon-button" onClick={() => navigate('/home/notification')}>
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
          <li onClick={() => navigate('/home/listevent')}>List Events</li>
        </ul>
      </div>
      {isSidePanelOpen && <div className="overlay" onClick={toggleSidePanel}></div>}
      <div className="Events-welcome-section">
        <h1 className="welcome-message">WELCOME to Events</h1>
      </div>
      <div className="content">
        <div className="main-content">
          <UpcomingEventCard events={events} /> {/* Add UpcomingEventCard here */}
          <div className="calendar-section">
            <h2>
              <FaCalendarAlt className="calendar-icon" /> Schedule:
              <Link to="/home/events/schedule" className="schedule-link">View Full Schedule</Link>
            </h2>
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
        </div>
      </div>
    </div>
  );
}

export default Events;
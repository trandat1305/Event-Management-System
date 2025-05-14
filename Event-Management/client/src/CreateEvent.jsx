import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';
import EventList from './EventList';
import EventCreateForm from './EventCreateForm';
import { FaBars } from 'react-icons/fa';

function CreateEvent() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [calendarDays, setCalendarDays] = useState([]);
  const [monthYear, setMonthYear] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [realCurrentDay, setRealCurrentDay] = useState(new Date().getDate());
  const [realCurrentMonth, setRealCurrentMonth] = useState(new Date().getMonth());
  const [realCurrentYear, setRealCurrentYear] = useState(new Date().getFullYear());
  const [isCreating, setIsCreating] = useState(false); // Manage form visibility
  const calendarRef = useRef(null);

  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    // Fetch events for the selected date (mock data for now)
    const mockEvents = [
      { title: 'Meeting', description: 'Team meeting at office', time: '10:00 AM' },
      { title: 'Lunch', description: 'Lunch with client', time: '1:00 PM' },
    ];
    setEvents(mockEvents);
  };

  const handleCreateEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]); // Add the new event
    setIsCreating(false); // Close the form
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
    document.addEventListener('click', (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setSelectedDate(null); // Unselect the date if clicked outside
      }
    });
    return () => {
      document.removeEventListener('click', (event) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target)) {
          setSelectedDate(null); // Unselect the date if clicked outside
        }
      });
    };
  }, []);

  return (
    <div className="create-event-container">
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
          <li onClick={() => navigate('/home/myevents')}>My Events</li>
          <li onClick={() => navigate('/home/events')}>Events</li>
          <li onClick={() => navigate('/home/listevent')}>List Events</li>
        </ul>
      </div>
      {isSidePanelOpen && <div className="overlay" onClick={toggleSidePanel}></div>}
      <h1>Create Event</h1>
      <p>Select a date for your event:</p>
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
      <EventList
        selectedDate={selectedDate}
        events={events}
        currentMonth={currentMonth}
        currentYear={currentYear}
        onCreateButtonClick={() => setIsCreating(true)} // Show the form when the button is clicked
      />
      {isCreating && (
        <EventCreateForm
          onClose={() => setIsCreating(false)}
          onCreate={handleCreateEvent}
        />
      )}
    </div>
  );
}

export default CreateEvent;
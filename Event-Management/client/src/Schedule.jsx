import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './Schedule.css';
import EventList from './EventList'; // Import EventList component

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
  const [events, setEvents] = useState([]); // State to hold events
  const calendarRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Sample events
  const allEvents = [
    { title: 'Meeting', description: 'Team meeting at office', time: '10:00 AM', date: '2025-05-01', isMyEvent: true },
    { title: 'Lunch', description: 'Lunch with client', time: '1:00 PM', date: '2025-05-01', isMyEvent: false },
    { title: 'Yoga Session', description: 'Morning yoga session', time: '7:00 AM', date: '2025-05-02', isMyEvent: false },
    { title: 'Tech Meetup', description: 'Discuss latest tech trends', time: '3:00 PM', date: '2025-05-03', isMyEvent: true },
    { title: 'Cooking Workshop', description: 'Learn to cook Italian dishes', time: '5:00 PM', date: '2025-05-04', isMyEvent: false },
  ];

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

  const handleDateClick = (day) => {
    setSelectedDate(day);
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const filteredEvents = allEvents.filter((event) => event.date === formattedDate);

    // Apply filter
    if (filter === 'myevent') {
      setEvents(filteredEvents.filter((event) => event.isMyEvent));
    } else if (filter === 'events') {
      setEvents(filteredEvents.filter((event) => !event.isMyEvent));
    } else {
      setEvents(filteredEvents);
    }
  };

  const getEventIndicatorClass = (day) => {
    if (!day) return ''; // Return empty if the day is null (e.g., padding days in the calendar)

    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const eventsForDay = allEvents.filter((event) => event.date === formattedDate);

    if (eventsForDay.length > 0) {
      const hasMyEvent = eventsForDay.some((event) => event.isMyEvent);
      const hasOtherEvent = eventsForDay.some((event) => !event.isMyEvent);

      // Apply filter logic
      if (filter === 'myevent') {
        return hasMyEvent ? 'red-indicator' : ''; // Only "My Event" in red
      } else if (filter === 'events') {
        return hasOtherEvent ? 'blue-indicator' : ''; // Only "Event" in blue
      } else if (filter === 'all') {
        if (hasMyEvent && hasOtherEvent) {
          return 'purple-indicator'; // Both "My Event" and "Event"
        } else if (hasMyEvent) {
          return 'red-indicator'; // Only "My Event"
        } else if (hasOtherEvent) {
          return 'blue-indicator'; // Only "Event"
        }
      }
    }
    return ''; // No events
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
              className={`calendar-date ${getEventIndicatorClass(day)} ${
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
        <>
          <div className="filtered-events">
            <h3>Events for {selectedDate} {monthYear}</h3>
            <p>{events.length > 0 ? events.map(event => event.title).join(', ') : 'No events for this day.'}</p>
          </div>
          <EventList
            selectedDate={selectedDate}
            events={events}
            currentMonth={currentMonth}
            currentYear={currentYear}
            onCreateButtonClick={() => console.log('Create Event Clicked')}
          />
        </>
      )}
    </div>
  );
}

export default Schedule;
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './Schedule.css';
import EventList from './EventList';

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
  const [filter, setFilter] = useState('all');
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const allEvents = [
    { title: 'Meeting', description: 'Team meeting at office', time: '10:00 AM', date: '2025-05-01', isMyEvent: true },
    { title: 'Lunch', description: 'Lunch with client', time: '1:00 PM', date: '2025-05-01', isMyEvent: false },
    { title: 'Yoga Session', description: 'Morning yoga session', time: '7:00 AM', date: '2025-05-02', isMyEvent: false },
    { title: 'Tech Meetup', description: 'Discuss latest tech trends', time: '3:00 PM', date: '2025-05-03', isMyEvent: true },
    { title: 'Cooking Workshop', description: 'Learn to cook Italian dishes', time: '5:00 PM', date: '2025-05-04', isMyEvent: false },
  ];

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

  const filterEventsForDate = (day, filterValue) => {
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const filteredEvents = allEvents.filter((event) => event.date === formattedDate);

    if (filterValue === 'myevent') {
      return filteredEvents.filter((event) => event.isMyEvent);
    } else if (filterValue === 'events') {
      return filteredEvents.filter((event) => !event.isMyEvent);
    } else {
      return filteredEvents;
    }
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    const filteredEvents = filterEventsForDate(day, filter);
    setEvents(filteredEvents);
  };

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    if (selectedDate) {
      const filteredEvents = filterEventsForDate(selectedDate, newFilter);
      setEvents(filteredEvents);
    }
  };

  const getEventIndicatorClass = (day) => {
    if (!day) return '';

    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const eventsForDay = allEvents.filter((event) => event.date === formattedDate);

    if (eventsForDay.length > 0) {
      const hasMyEvent = eventsForDay.some((event) => event.isMyEvent);
      const hasOtherEvent = eventsForDay.some((event) => !event.isMyEvent);

      if (filter === 'myevent') {
        return hasMyEvent ? 'red-indicator' : '';
      } else if (filter === 'events') {
        return hasOtherEvent ? 'blue-indicator' : '';
      } else if (filter === 'all') {
        if (hasMyEvent && hasOtherEvent) {
          return 'purple-indicator';
        } else if (hasMyEvent) {
          return 'red-indicator';
        } else if (hasOtherEvent) {
          return 'blue-indicator';
        }
      }
    }
    return '';
  };

  const generateCalendar = React.useCallback(() => {
    const firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
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
        setSelectedDate(null);
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
      <div className="filter-container mb-6">
        <label htmlFor="filter-select" className="mr-2 text-lg font-medium text-gray-700">
          Filter:
        </label>
        <select
          id="filter-select"
          value={filter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Events</option>
          <option value="myevent">My Events</option>
          <option value="events">Events</option>
        </select>
      </div>
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
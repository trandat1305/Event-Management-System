import React from 'react';
import './EventList.css';
import EventCard from './EventCard'; // Import the EventCard component

function EventList({ selectedDate, events, currentMonth, currentYear, onCreateButtonClick }) {
  const formattedDate =
    selectedDate && currentMonth !== undefined && currentYear !== undefined
      ? `${selectedDate} ${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })}, ${currentYear}`
      : 'No Date Selected';

  return (
    <div className={`event-list-container ${selectedDate ? 'visible' : ''}`}>
      <h2>Events on {formattedDate}</h2>
      {selectedDate && events.length > 0 ? (
        <div className="event-list">
          {events.map((event, index) => (
            <EventCard key={index} event={event} /> // Use EventCard component
          ))}
        </div>
      ) : (
        <p>No events for this day.</p>
      )}
      <button className="create-event-button" onClick={onCreateButtonClick}>
        Create Event
      </button>
    </div>
  );
}

export default EventList;
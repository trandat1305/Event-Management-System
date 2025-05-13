import React from 'react';
import './EventList.css';

function EventList({ selectedDate, events, currentMonth, currentYear, onCreateButtonClick }) {
  // Ensure currentMonth and currentYear are valid before formatting
  const formattedDate =
    selectedDate && currentMonth !== undefined && currentYear !== undefined
      ? `${selectedDate} ${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })}, ${currentYear}`
      : 'No Date Selected';

  return (
    <div className={`event-list-container ${selectedDate ? 'visible' : ''}`}>
      <h2>Events on {formattedDate}</h2>
      {selectedDate && events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Time:</strong> {event.time}
              </p>
            </li>
          ))}
        </ul>
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
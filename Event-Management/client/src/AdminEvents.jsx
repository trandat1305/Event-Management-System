import React from 'react';
import './AdminEvents.css';

function Event() {
  const events = [
    { id: 1, title: 'Annual Meeting', date: '2025-05-15', location: 'New York' },
    { id: 2, title: 'Tech Conference', date: '2025-06-20', location: 'San Francisco' },
    { id: 3, title: 'Music Festival', date: '2025-07-10', location: 'Los Angeles' },
  ];

  return (
    <div className="event-container">
      <h1>Event Management</h1>
      <table className="event-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.title}</td>
              <td>{event.date}</td>
              <td>{event.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Event;
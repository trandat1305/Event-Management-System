import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaCompass, FaArrowLeft } from 'react-icons/fa';
import './Home.css'; // Tái sử dụng style hiện đại từ Home

function Discover() {
  const navigate = useNavigate();
  // Mock data cho các sự kiện public
  const events = [
    {
      _id: '1',
      title: 'ReactJS Meetup 2025',
      startTime: '2025-06-01T18:00:00',
      location: 'Hà Nội',
      price: 0,
      imageURL: '',
      category: 'Tech'
    },
    {
      _id: '2',
      title: 'Summer Music Festival',
      startTime: '2025-06-10T20:00:00',
      location: 'TP. HCM',
      price: 10,
      imageURL: '',
      category: 'Music'
    },
    {
      _id: '3',
      title: 'Open Art Exhibition',
      startTime: '2025-06-15T09:00:00',
      location: 'Đà Nẵng',
      price: 0,
      imageURL: '',
      category: 'Art'
    }
  ];

  const handleJoin = (eventId) => {
    alert('Bạn đã tham gia sự kiện! (Demo UI)');
  };

  return (
    <div className="home-container float-in-discover">
      <nav className="nav-bar discover-nav-bar" style={{ position: 'relative' }}>
        <button
          className="back-btn-discover"
          style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
          onClick={() => navigate('/user')}
        >
          <FaArrowLeft style={{ marginRight: 6 }} /> Back
        </button>
        <h1
          className="logo discover-logo-center"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            margin: 0,
            color: 'var(--primary-color)',
            cursor: 'pointer',
            fontWeight: 700
          }}
          onClick={() => navigate('/home')}
        >
          Eventer
        </h1>
      </nav>
      <section className="featured-events">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2 style={{ textAlign: 'center', width: '100%' }}>Discover Public Events</h2>
        </div>
        <div className="events-grid">
          {events.map(event => (
            <div key={event._id} className="event-card">
              <div className="event-image">
                <img src={event.imageURL || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'} alt={event.title} />
                <span className="event-category">{event.category || 'General'}</span>
              </div>
              <div className="event-details">
                <h3>{event.title}</h3>
                <div className="event-info">
                  <span><FaCalendarAlt /> {new Date(event.startTime).toLocaleDateString()}</span>
                  <span><FaMapMarkerAlt /> {event.location}</span>
                </div>
                <div className="event-footer">
                  <span className="event-price">{event.price ? `$${event.price}` : 'Free'}</span>
                  <button className="book-now-btn" onClick={() => handleJoin(event._id)}>Tham gia</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Discover; 
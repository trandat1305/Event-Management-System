import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaCompass, FaArrowLeft } from 'react-icons/fa';
import './Home.css';
import EventCard from './EventCard';
import { useSelector } from 'react-redux';

function Discover() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const token = useSelector(state => state.auth.token);
  
  useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/events/public', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      // <-- Add this for debugging
      if (Array.isArray(data.events)) {
        setEvents(data.events);
      } else {
        console.log('Unexpected data format:', data);
        alert(data.error || 'Failed to get events');
      }
      } catch (error) {
        alert('Server error: ' + error.message);
      }
    };
    fetchEvents();
  }, [token]);

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
            <EventCard event ={event} key={event._id} token={token}/>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Discover;
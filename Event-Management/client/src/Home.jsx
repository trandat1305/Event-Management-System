import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaUserCircle, FaCalendarAlt, FaMapMarkerAlt, FaFilter } from 'react-icons/fa';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const featuredEvents = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      date: 'May 20, 2024',
      time: '10:00 AM',
      location: 'San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '$299',
      category: 'Technology'
    },
    {
      id: 2,
      title: 'Summer Music Festival',
      date: 'June 15, 2024',
      time: '2:00 PM',
      location: 'Los Angeles, CA',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '$199',
      category: 'Music'
    },
    {
      id: 3,
      title: 'Food & Wine Expo',
      date: 'July 10, 2024',
      time: '6:00 PM',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '$149',
      category: 'Food & Drink'
    }
  ];

  return (
    <div className={`home-container`}>
      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="nav-left">
          <h1 className="logo">Eventer</h1>
        </div>
        <div className="nav-right">
          <button className="nav-btn" onClick={() => navigate('/login')}>Login</button>
          <button className="nav-btn signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
          <button className="nav-btn" onClick={() => navigate('/user')} title="User Page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaUserCircle style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
            <span style={{ display: 'inline-block' }}>User Page</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover Events That Matter to You</h1>
          <p>Find and create events that bring people together</p>
            <button className="home-create-event-btn" onClick={() => navigate('/createevent')}>
              Create Event
            </button>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Eventer</h2>
        <div className="about-content">
          <div className="about-card">
            <h3>Discover Events</h3>
            <p>Find the perfect events that match your interests. From tech conferences to music festivals, we've got you covered.</p>
          </div>
          <div className="about-card">
            <h3>Create & Share</h3>
            <p>Host your own events and share them with the world. Our platform makes event creation and management simple.</p>
          </div>
          <div className="about-card">
            <h3>Connect & Network</h3>
            <p>Meet like-minded people and build your network. Join communities and stay updated with upcoming events.</p>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="featured-events">
        <div className="section-header">
          <h2>Featured Events</h2>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="events-grid">
          {featuredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <img src={event.image} alt={event.title} />
                <span className="event-category">{event.category}</span>
              </div>
              <div className="event-details">
                <h3>{event.title}</h3>
                <div className="event-info">
                  <span><FaCalendarAlt /> {event.date}</span>
                  <span><FaMapMarkerAlt /> {event.location}</span>
                </div>
                <div className="event-footer">
                  <span className="event-price">{event.price}</span>
                  <button className="book-now-btn">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="upcoming-events">
        <div className="section-header">
          <h2>Upcoming Events</h2>
          <div className="filter-container">
            <FaFilter className="filter-icon" />
            <select className="filter-select">
              <option value="all">All Events</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
        <div className="events-list">
          {/* Similar event cards as featured events */}
        </div>
      </section>
    </div>
  );
}

export default Home;
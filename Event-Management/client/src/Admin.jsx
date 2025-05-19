import React, { useState } from 'react';
import { FaUser, FaCalendarAlt, FaUserTie, FaSignOutAlt, FaTachometerAlt, FaUsers, FaCog, FaEdit, FaTrash, FaTimes, FaCalendar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Admin.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const pages = [
  { key: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { key: 'users', label: 'Users', icon: <FaUsers /> },
  { key: 'events', label: 'Events', icon: <FaCalendarAlt /> },
  { key: 'settings', label: 'Settings', icon: <FaCog /> },
];

function Admin() {
  const [stats] = useState({ users: 30, organizers: 3, events: 20 });
  const [page, setPage] = useState('dashboard');
  const [config, setConfig] = useState({
    maxActiveEvents: 5,
    maxInvitations: 100
  });
  const [users, setUsers] = useState([
    { id: 1, username: 'john_doe', email: 'john@example.com', password: 'pass123', eventsParticipated: 5, eventsOrganized: 2 },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', password: 'secure456', eventsParticipated: 3, eventsOrganized: 0 },
    { id: 3, username: 'bob_jones', email: 'bob@example.com', password: 'mypassword', eventsParticipated: 8, eventsOrganized: 4 },
    { id: 4, username: 'alice_brown', email: 'alice@example.com', password: 'alice789', eventsParticipated: 1, eventsOrganized: 1 },
  ]);
  const [events, setEvents] = useState([
    { id: 1, name: 'Tech Conference 2025', date: '2025-06-01', location: 'New York', participants: 150, organizer: 'john_doe' },
    { id: 2, name: 'Art Workshop', date: '2025-07-15', location: 'Los Angeles', participants: 45, organizer: 'jane_smith' },
    { id: 3, name: 'Music Festival', date: '2025-08-20', location: 'Chicago', participants: 200, organizer: 'bob_jones' },
    { id: 4, name: 'Charity Run', date: '2025-09-10', location: 'Boston', participants: 80, organizer: 'alice_brown' },
  ]);
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'System Update v2.1', message: 'New features added to event management.', date: '2025-05-10' },
    { id: 2, title: 'Maintenance Notice', message: 'Scheduled downtime on May 20.', date: '2025-05-15' },
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', message: '', date: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const navigate = useNavigate();

  // Mock data for upcoming events (for dashboard chart)
  const upcomingEvents = [
    { name: 'Tech Conference 2025', participants: 150 },
    { name: 'Art Workshop', participants: 45 },
    { name: 'Music Festival', participants: 200 },
    { name: 'Charity Run', participants: 80 },
    { name: 'Coding Bootcamp', participants: 60 },
  ];

  // Chart data and options
  const chartData = {
    labels: upcomingEvents.map(event => event.name),
    datasets: [
      {
        label: 'Number of Participants',
        data: upcomingEvents.map(event => event.participants),
        backgroundColor: '#f05537',
        borderColor: '#ff6b6b',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: 'Participants in Upcoming Events',
        color: '#f05537',
        font: { size: 18, weight: '600' },
        padding: { bottom: 20 },
      },
    },
    scales: {
      x: {
        ticks: { color: '#333', font: { size: 12 }, maxRotation: 45, minRotation: 45 },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#333', font: { size: 12 }, stepSize: 50 },
        grid: { color: 'rgba(0,0,0,0.1)' },
      },
    },
  };

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const handleConfigSave = (e) => {
    e.preventDefault();
    console.log('Saving configuration:', config);
    alert('Configuration saved successfully!');
  };

  // Announcement Management
  const handleAnnouncementChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.message || !newAnnouncement.date) {
      alert('Please fill in all fields.');
      return;
    }
    const selectedDate = new Date(newAnnouncement.date);
    const today = new Date('2025-05-19');
    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      alert('Cannot select a past date.');
      return;
    }
    const newId = announcements.length > 0 ? Math.max(...announcements.map(a => a.id)) + 1 : 1;
    setAnnouncements([...announcements, { id: newId, ...newAnnouncement }]);
    setNewAnnouncement({ title: '', message: '', date: '' });
    setShowDatePicker(false);
    console.log('Posted announcement:', newAnnouncement);
    alert('Announcement posted successfully!');
  };

  const toggleDatePicker = () => {
    setShowDatePicker(prev => !prev);
  };

  // User Management
  const handleEditUser = (user) => {
    setEditingUser({ ...user });
  };

  const handleDeleteUser = (username) => {
    if (window.confirm(`Are you sure you want to delete ${username}?`)) {
      setUsers(users.filter(user => user.username !== username));
      console.log(`Deleted user: ${username}`);
    }
  };

  const handleSaveEditUser = (e) => {
    e.preventDefault();
    setUsers(users.map(user => 
      user.id === editingUser.id ? { ...editingUser } : user
    ));
    setEditingUser(null);
    console.log('Saved user:', editingUser);
  };

  const handleEditUserChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prev => ({
      ...prev,
      [name]: name === 'eventsParticipated' || name === 'eventsOrganized' ? parseInt(value) || 0 : value
    }));
  };

  const handleCloseUserModal = () => {
    setEditingUser(null);
  };

  // Event Management
  const handleEditEvent = (event) => {
    setEditingEvent({ ...event });
  };

  const handleDeleteEvent = (name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setEvents(events.filter(event => event.name !== name));
      console.log(`Deleted event: ${name}`);
    }
  };

  const handleSaveEditEvent = (e) => {
    e.preventDefault();
    setEvents(events.map(event => 
      event.id === editingEvent.id ? { ...editingEvent } : event
    ));
    setEditingEvent(null);
    console.log('Saved event:', editingEvent);
  };

  const handleEditEventChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCloseEventModal = () => {
    setEditingEvent(null);
  };

  const renderContent = () => {
    switch (page) {
      case 'dashboard':
        return (
          <div className="admin-dashboard-main float-in-discover">
            <h1 className="admin-dashboard-title">Admin Dashboard</h1>
            <div className="admin-dashboard-stats">
              <div className="admin-dashboard-stat admin-dashboard-stat-users">
                <FaUser className="admin-dashboard-icon admin-dashboard-icon-users" />
                <div>
                  <div className="admin-dashboard-stat-label">Total Users</div>
                  <div className="admin-dashboard-stat-value admin-dashboard-stat-value-users">{stats.users}</div>
                </div>
              </div>
              <div className="admin-dashboard-stat admin-dashboard-stat-organizers">
                <FaUserTie className="admin-dashboard-icon admin-dashboard-icon-organizers" />
                <div>
                  <div className="admin-dashboard-stat-label">Organizers</div>
                  <div className="admin-dashboard-stat-value admin-dashboard-stat-value-organizers">{stats.organizers}</div>
                </div>
              </div>
              <div className="admin-dashboard-stat admin-dashboard-stat-events">
                <FaCalendarAlt className="admin-dashboard-icon admin-dashboard-icon-events" />
                <div>
                  <div className="admin-dashboard-stat-label">Total Events</div>
                  <div className="admin-dashboard-stat-value admin-dashboard-stat-value-events">{stats.events}</div>
                </div>
              </div>
            </div>
            <div className="admin-dashboard-welcome">
              <b>Welcome, Admin!</b> Here you can manage users, events, and system settings.
            </div>
            <div className="admin-dashboard-chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
            <div className="admin-announcement-container">
              <h3 className="admin-announcement-title">Post Update Announcement</h3>
              <form className="admin-announcement-form" onSubmit={handlePostAnnouncement}>
                <label className="admin-announcement-label">
                  <span>Title</span>
                  <input
                    type="text"
                    name="title"
                    value={newAnnouncement.title}
                    onChange={handleAnnouncementChange}
                    className="admin-announcement-input"
                    required
                  />
                </label>
                <label className="admin-announcement-label">
                  <span>Message</span>
                  <textarea
                    name="message"
                    value={newAnnouncement.message}
                    onChange={handleAnnouncementChange}
                    className="admin-announcement-textarea"
                    rows="4"
                    required
                  />
                </label>
                <label className="admin-announcement-label">
                  <span>Date</span>
                  <div className="admin-announcement-date-field">
                    <input
                      type="date"
                      name="date"
                      value={newAnnouncement.date}
                      onChange={handleAnnouncementChange}
                      className="admin-announcement-date-input"
                      min="2025-05-19"
                      style={{ display: showDatePicker ? 'block' : 'none' }}
                      required
                    />
                    <button
                      type="button"
                      className="admin-announcement-date-btn"
                      onClick={toggleDatePicker}
                    >
                      <FaCalendar /> {showDatePicker ? 'Close Calendar' : 'Select Date'}
                    </button>
                  </div>
                </label>
                <button type="submit" className="admin-announcement-submit-btn">Post Announcement</button>
              </form>
              <div className="admin-announcements-list">
                <h3 className="admin-announcements-list-title">Posted Announcements</h3>
                {announcements.length === 0 ? (
                  <p className="admin-announcements-empty">No announcements posted yet.</p>
                ) : (
                  announcements.map(announcement => (
                    <div key={announcement.id} className="admin-announcement-card">
                      <h4 className="admin-announcement-card-title">{announcement.title}</h4>
                      <p className="admin-announcement-card-message">{announcement.message}</p>
                      <p className="admin-announcement-card-date">Posted on: {announcement.date}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="admin-dashboard-main float-in-discover">
            <h2 className="admin-page-title">User Management</h2>
            <div className="admin-users-table-container">
              <table className="admin-users-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Events Participated</th>
                    <th>Events Organized</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>***</td>
                      <td>{user.eventsParticipated}</td>
                      <td>{user.eventsOrganized}</td>
                      <td>
                        <button
                          className="admin-users-edit-btn"
                          onClick={() => handleEditUser(user)}
                          title="Edit User"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="admin-users-delete-btn"
                          onClick={() => handleDeleteUser(user.username)}
                          title="Delete User"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {editingUser && (
              <div className="admin-modal-overlay">
                <div className="admin-modal">
                  <button className="admin-modal-close" onClick={handleCloseUserModal}>
                    <FaTimes />
                  </button>
                  <h3 className="admin-modal-title">Edit User</h3>
                  <form className="admin-modal-form" onSubmit={handleSaveEditUser}>
                    <label className="admin-modal-label">
                      <span>Username</span>
                      <input
                        type="text"
                        name="username"
                        value={editingUser.username}
                        onChange={handleEditUserChange}
                        className="admin-modal-input"
                        required
                      />
                    </label>
                    <label className="admin-modal-label">
                      <span>Email</span>
                      <input
                        type="email"
                        name="email"
                        value={editingUser.email}
                        onChange={handleEditUserChange}
                        className="admin-modal-input"
                        required
                      />
                    </label>
                    <label className="admin-modal-label">
                      <span>Password</span>
                      <input
                        type="password"
                        name="password"
                        value={editingUser.password}
                        onChange={handleEditUserChange}
                        className="admin-modal-input"
                        required
                      />
                    </label>
                    <label className="admin-modal-label">
                      <span>Events Participated</span>
                      <input
                        type="number"
                        name="eventsParticipated"
                        value={editingUser.eventsParticipated}
                        onChange={handleEditUserChange}
                        min="0"
                        className="admin-modal-input"
                        required
                      />
                    </label>
                    <label className="admin-modal-label">
                      <span>Events Organized</span>
                      <input
                        type="number"
                        name="eventsOrganized"
                        value={editingUser.eventsOrganized}
                        onChange={handleEditUserChange}
                        min="0"
                        className="admin-modal-input"
                        required
                      />
                    </label>
                    <div className="admin-modal-actions">
                      <button type="submit" className="admin-modal-save-btn">Save</button>
                      <button type="button" className="admin-modal-cancel-btn" onClick={handleCloseUserModal}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      case 'events':
        return (
          <div className="admin-dashboard-main float-in-discover">
            <h2 className="admin-page-title">Event Management</h2>
            <div className="admin-events-table-container">
              <table className="admin-events-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Participants</th>
                    <th>Organizer</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event.id}>
                      <td>{event.name}</td>
                      <td>{event.date}</td>
                      <td>{event.location}</td>
                      <td>{event.participants}</td>
                      <td>{event.organizer}</td>
                      <td>
                        <button
                          className="admin-events-edit-btn"
                          onClick={() => handleEditEvent(event)}
                          title="Edit Event"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="admin-events-delete-btn"
                          onClick={() => handleDeleteEvent(event.name)}
                          title="Delete Event"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {editingEvent && (
              <div className="admin-modal-overlay">
                <div className="admin-modal">
                  <button className="admin-modal-close" onClick={handleCloseEventModal}>
                    <FaTimes />
                  </button>
                  <h3 className="admin-modal-title">Edit Event</h3>
                  <form className="admin-modal-form" onSubmit={handleSaveEditEvent}>
                    <label className="admin-modal-label">
                      <span>Name</span>
                      <input
                        type="text"
                        name="name"
                        value={editingEvent.name}
                        onChange={handleEditEventChange}
                        className="admin-modal-input"
                        required
                      />
                    </label>
                    <label className="admin-modal-label">
                      <span>Date</span>
                      <input
                        type="text"
                        name="date"
                        value={editingEvent.date}
                        onChange={handleEditEventChange}
                        className="admin-modal-input"
                        placeholder="YYYY-MM-DD"
                        required
                      />
                    </label>
                    <label className="admin-modal-label">
                      <span>Location</span>
                      <input
                        type="text"
                        name="location"
                        value={editingEvent.location}
                        onChange={handleEditEventChange}
                        className="admin-modal-input"
                        required
                      />
                    </label>
                    <label className="admin-modal-label">
                      <span>Participants</span>
                      <input
                        type="number"
                        name="participants"
                        value={editingEvent.participants}
                        className="admin-modal-input"
                        readOnly
                      />
                    </label>
                    <label className="admin-modal-label">
                      <span>Organizer</span>
                      <input
                        type="text"
                        name="organizer"
                        value={editingEvent.organizer}
                        className="admin-modal-input"
                        readOnly
                      />
                    </label>
                    <div className="admin-modal-actions">
                      <button type="submit" className="admin-modal-save-btn">Save</button>
                      <button type="button" className="admin-modal-cancel-btn" onClick={handleCloseEventModal}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      case 'settings':
        return (
          <div className="admin-dashboard-main float-in-discover">
            <h2 className="admin-page-title">System Settings</h2>
            <div className="settings-form">
              <h3 className="settings-form-title">Event & Invitation Limits</h3>
              <div className="settings-form-content">
                <label className="settings-form-label">
                  <span className="settings-form-label-text">Maximum Active Events per User</span>
                  <input
                    type="number"
                    name="maxActiveEvents"
                    value={config.maxActiveEvents}
                    onChange={handleConfigChange}
                    min="1"
                    className="settings-form-input"
                  />
                </label>
                <label className="settings-form-label">
                  <span className="settings-form-label-text">Maximum Invitations per Event</span>
                  <input
                    type="number"
                    name="maxInvitations"
                    value={config.maxInvitations}
                    onChange={handleConfigChange}
                    min="1"
                    className="settings-form-input"
                  />
                </label>
                <button
                  onClick={handleConfigSave}
                  className="settings-form-button"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-title">Admin Panel</div>
        {pages.map(item => (
          <button
            key={item.key}
            className={page === item.key ? 'admin-sidebar-btn active' : 'admin-sidebar-btn'}
            onClick={() => setPage(item.key)}
          >
            {item.icon} {item.label}
          </button>
        ))}
        <button
          className="admin-sidebar-btn admin-sidebar-logout"
          onClick={() => navigate('/login')}
        >
          <FaSignOutAlt className="admin-sidebar-logout-icon" /> Logout
        </button>
      </aside>
      <main className="admin-dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default Admin;
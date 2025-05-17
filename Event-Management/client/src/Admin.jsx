import React, { useState } from 'react';
import { FaBars, FaHome, FaUser, FaCalendarAlt, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Admin.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Admin() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [rsvpReminderDays, setRsvpReminderDays] = useState(1); // Default to 1 day
  const [updateMessage, setUpdateMessage] = useState(''); // Update message input
  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  // Function to calculate percentage change
  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? "+100%" : "0%";
    const change = ((current - previous) / previous) * 100;
    const sign = change >= 0 ? "+" : "-";
    return `${sign}${Math.abs(change).toFixed(0)}%`;
  };

  // Data for this week and last week
  const systemData = {
    users: { current: 250, previous: 238 },
    events: { current: 120, previous: 133 },
    invitations: { current: 500, previous: 435 },
  };

  // Sample data for events in May 2025
  const eventData = {
    labels: ['Event 1', 'Event 2', 'Event 3', 'Event 4', 'Event 5', 'Event 6'],
    datasets: [
      {
        label: 'Attendees',
        data: [80, 50, 30, 60, 40, 70],
        backgroundColor: '#666',
        borderColor: '#666',
        borderWidth: 1,
      },
    ],
  };

  // Chart options to customize appearance
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Events',
          color: '#666',
          font: { size: 14 },
        },
        ticks: { color: '#666' },
      },
      y: {
        title: {
          display: true,
          text: 'Attendees',
          color: '#666',
          font: { size: 14 },
        },
        ticks: { color: '#666', beginAtZero: true },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  // Handle RSVP reminder days change
  const handleRsvpReminderChange = (e) => {
    const days = parseInt(e.target.value);
    if (days >= 1) { // Ensure minimum 1 day
      setRsvpReminderDays(days);
    }
  };

  // Handle update message change
  const handleUpdateMessageChange = (e) => {
    setUpdateMessage(e.target.value);
  };

  // Simulate sending update notification to all users
  const sendUpdateNotification = () => {
    if (updateMessage.trim() === '') {
      alert('Please enter an update message.');
      return;
    }
    console.log(`Sending update notification to all users: "${updateMessage}"`);
    // Reset the input field after sending
    setUpdateMessage('');
  };

  return (
    <div className="admin-container">
      <header className="header">
        <div className="header-left">
          <button className="toggle-button" onClick={toggleSidePanel}>
            <FaBars />
          </button>
        </div>
        <div className="header-right">
          <button className="icon-button">
            <FaMoon />
          </button>
          <button className="icon-button" onClick={() => navigate('/login')}>
            <FaSignOutAlt />
          </button>
        </div>
      </header>
      <div className={`side-panel ${isSidePanelOpen ? 'open' : ''}`}>
        <h2 className="text-lg md:text-xl">Side Panel</h2>
        <ul>
          <li onClick={() => navigate('/admin')} className="text-sm md:text-base">
            <FaHome className="icon" />
            <span>Dashboard</span>
          </li>
          <li onClick={() => navigate('/admin/users')} className="text-sm md:text-base">
            <FaUser className="icon" />
            <span>Users</span>
          </li>
          <li onClick={() => navigate('/admin/events')} className="text-sm md:text-base">
            <FaCalendarAlt className="icon" />
            <span>Events</span>
          </li>
        </ul>
      </div>
      {isSidePanelOpen && (
        <div className={`overlay ${isSidePanelOpen ? 'visible' : ''}`} onClick={toggleSidePanel}></div>
      )}
      <div className="adminWelcomeSection flex flex-col md:flex-row items-center justify-between">
        <h1 className="welcome-message text-2xl sm:text-3xl md:text-4xl mb-4 md:mb-0">Welcome, Admin</h1>
        <div className="admin-summary flex flex-col sm:flex-row gap-4">
          <div className="summary-card">
            <h2 className="text-sm md:text-base">Active Events</h2>
            <p className="text-lg md:text-xl">31</p>
          </div>
          <div className="summary-card">
            <h2 className="text-sm md:text-base">Server Status</h2>
            <p className="status-live text-lg md:text-xl">Live</p>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="system-summary">
          <h2 className="text-lg md:text-2xl">System Summary</h2>
          <div className="summary-grid flex flex-col md:flex-row">
            <div className="summary-item">
              <h3 className="text-base md:text-lg">Users</h3>
              <p className="text-lg md:text-2xl">{systemData.users.current}</p>
              <span className="text-xs md:text-sm">
                {calculatePercentageChange(systemData.users.current, systemData.users.previous)} from last week
              </span>
            </div>
            <div className="summary-item">
              <h3 className="text-base md:text-lg">Events</h3>
              <p className="text-lg md:text-2xl">{systemData.events.current}</p>
              <span className="text-xs md:text-sm">
                {calculatePercentageChange(systemData.events.current, systemData.events.previous)} from last week
              </span>
            </div>
            <div className="summary-item">
              <h3 className="text-base md:text-lg">Invitations</h3>
              <p className="text-lg md:text-2xl">{systemData.invitations.current}</p>
              <span className="text-xs md:text-sm">
                {calculatePercentageChange(systemData.invitations.current, systemData.invitations.previous)} from last week
              </span>
            </div>
          </div>
        </div>
        <div className="notification-settings">
          <h2 className="text-lg md:text-2xl">Notification Settings</h2>
          <div className="settings-form flex flex-col md:flex-row md:items-center gap-4">
            {/* RSVP Reminder */}
            <div className="flex items-center gap-2">
              <label className="text-sm md:text-base">RSVP Reminder (days before):</label>
              <select
                value={rsvpReminderDays}
                onChange={handleRsvpReminderChange}
                className="border border-gray-300 rounded px-2 py-1 text-sm md:text-base"
              >
                {[...Array(7)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} {i + 1 === 1 ? 'day' : 'days'}</option>
                ))}
              </select>
            </div>
            {/* Update Notification */}
            <div className="flex flex-col md:flex-row items-center gap-2 w-full">
              <label className="text-sm md:text-base">Send Update Notification:</label>
              <input
                type="text"
                value={updateMessage}
                onChange={handleUpdateMessageChange}
                placeholder="Type update message here..."
                className="border border-gray-300 rounded px-2 py-1 text-sm md:text-base flex-1"
              />
              <button
                onClick={sendUpdateNotification}
                className="save-button text-sm md:text-base"
              >
                Send Update
              </button>
            </div>
          </div>
        </div>
        <div className="system-overview">
          <h2 className="text-lg md:text-2xl">System Overview</h2>
          <div className="chart-container">
            <Bar data={eventData} options={chartOptions} />
          </div>
          <p className="text-xs md:text-sm">Event Completion</p>
        </div>
      </div>
    </div>
  );
}

export default Admin;
import React, { useState } from 'react';
import { FaBars, FaMoon, FaSignOutAlt, FaHome, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AdminBackground from './assets/AdminBackground.jpg';
import EditUserModal from './EditUserModal';
import './User.css';

function User() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', password: 'pass123', eventsAttended: 5, eventsCreated: 2 },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', password: 'secure456', eventsAttended: 3, eventsCreated: 0 },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', password: 'alice789', eventsAttended: 8, eventsCreated: 4 },
    { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', password: 'bob321', eventsAttended: 1, eventsCreated: 1 },
    { id: 5, name: 'Carol White', email: 'carol.white@example.com', password: 'carol654', eventsAttended: 6, eventsCreated: 3 },
    { id: 6, name: 'David Lee', email: 'david.lee@example.com', password: 'david987', eventsAttended: 2, eventsCreated: 0 },
    { id: 7, name: 'Emma Davis', email: 'emma.davis@example.com', password: 'emma123', eventsAttended: 4, eventsCreated: 2 },
    { id: 8, name: 'Frank Wilson', email: 'frank.wilson@example.com', password: 'frank456', eventsAttended: 0, eventsCreated: 1 },
    { id: 9, name: 'Grace Taylor', email: 'grace.taylor@example.com', password: 'grace789', eventsAttended: 7, eventsCreated: 5 },
    { id: 10, name: 'Henry Moore', email: 'henry.moore@example.com', password: 'henry321', eventsAttended: 3, eventsCreated: 0 },
  ]);
  const [editUser, setEditUser] = useState(null);

  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleSaveEdit = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setEditUser(null);
  };

  return (
    <div className="user-container">
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
      <div
        className="user-welcome-section w-full h-[200px] bg-cover bg-center flex items-center justify-center p-2"
        style={{ backgroundImage: `url(${AdminBackground})` }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          User Management
        </h1>
      </div>
      <div className="user-content">
        <h2 className="user-table-title">User List</h2>
        <div className="user-table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Events Attended</th>
                <th>Events Organized</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{editUser && editUser.id === user.id ? user.password : '####'}</td>
                  <td>{user.eventsAttended}</td>
                  <td>{user.eventsCreated}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editUser && (
        <EditUserModal
          user={editUser}
          onSave={handleSaveEdit}
          onClose={() => setEditUser(null)}
        />
      )}
    </div>
  );
}

export default User;
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaMoon, FaBell, FaSignOutAlt, FaCamera, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import defaultAvatar from './assets/default-avatar.png';
import './MyAccount.css';

function MyAccount() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '********',
    avatar: defaultAvatar,
    role: 'User',
  });
  const [tempInfo, setTempInfo] = useState({ ...userInfo });
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setTempInfo({ ...userInfo });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTempInfo({ ...userInfo });
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    setUserInfo({ ...tempInfo });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo((prev) => ({ ...prev, avatar: reader.result }));
        setTempInfo((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="my-account-container">
      <header className="my-account-header">
        <div className="header-left">
          <button className="toggle-button" onClick={toggleSidePanel}>
            <FaBars />
          </button>
        </div>
        <div className="header-right">
          <button className="icon-button">
            <FaMoon />
          </button>
          <button className="icon-button" onClick={() => navigate('/home/notification')}>
            <FaBell />
            <span className="notification-dot"></span>
          </button>
          <button className="create-button" onClick={() => navigate('/home/createevent')}>
            + Create
          </button>
          <button className="icon-button" onClick={() => navigate('/home/myaccount')}>
            <FaSignOutAlt />
          </button>
        </div>
      </header>
      <div className={`side-panel ${isSidePanelOpen ? 'open' : ''}`}>
        <h2 className="text-xl font-bold mb-4">Side Panel</h2>
        <ul>
          <li onClick={() => navigate('/home')} className="hover:text-blue-500 cursor-pointer py-2">
            Home
          </li>
          <li onClick={() => navigate('/home/myevents')} className="hover:text-blue-500 cursor-pointer py-2">
            My Events
          </li>
          <li onClick={() => navigate('/home/events')} className="hover:text-blue-500 cursor-pointer py-2">
            Events
          </li>
          <li onClick={() => navigate('/home/listevent')} className="hover:text-blue-500 cursor-pointer py-2">
            List Events
          </li>
        </ul>
      </div>
      {isSidePanelOpen && <div className="overlay visible" onClick={toggleSidePanel}></div>}
      <div className="welcome-section">
        <h1 className="welcome-message">Welcome to My Account page</h1>
      </div>
      <div className="content flex flex-col items-center justify-center min-h-screen">
        <div className="info-section-container flex items-center justify-center w-full">
          <div className="info-section p-6 w-1/3 border-2 border-gray-300 rounded-lg">
            <div className="avatar-container relative mb-6 flex justify-center">
              <img
                src={userInfo.avatar}
                alt="User Avatar"
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {isEditing && (
                <button
                  onClick={handleAvatarClick}
                  className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                >
                  <FaCamera size={16} />
                </button>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                className="hidden avatar-file-input"
              />
            </div>
            <p className="text-center text-lg font-semibold mb-6">{userInfo.role}</p>
            <div className="user-info space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-base">Name:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={tempInfo.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                ) : (
                  <p className="text-gray-600 text-base">{userInfo.name}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-base">Email:</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={tempInfo.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                ) : (
                  <p className="text-gray-600 text-base">{userInfo.email}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-base">Password:</label>
                {isEditing ? (
                  <input
                    type="password"
                    name="password"
                    value={tempInfo.password}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                ) : (
                  <p className="text-gray-600 text-base">{userInfo.password}</p>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              {isEditing ? (
                <div className="flex space-x-4">
                  <button
                    onClick={handleSaveEdit}
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-base"
                  >
                    <FaSave className="mr-2" /> Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-base"
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEditClick}
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-base"
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
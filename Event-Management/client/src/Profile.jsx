import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Profile.css';

function Profile({ isProfileOpen, toggleProfile }) {
  const navigate = useNavigate(); // Initialize the navigate function

  if (!isProfileOpen) return null; // Do not render if the profile is closed

  const handleMyAccountClick = () => {
    toggleProfile(); // Close the profile dropdown
    navigate('/myaccount'); // Navigate to the My Account page
  };

  const handleLogoutClick = () => {
    toggleProfile(); // Close the profile dropdown
    navigate('/login'); // Navigate to the Login page
  };

  return (
    <div className="profile-overlay" onClick={toggleProfile}>
      <div className="profile-window" onClick={(e) => e.stopPropagation()}>
        <ul>
          <li onClick={handleMyAccountClick}>My Account</li>
          <li onClick={handleLogoutClick}>Logout</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
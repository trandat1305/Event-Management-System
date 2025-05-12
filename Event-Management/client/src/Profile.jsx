import React from 'react';
import './Profile.css';

function Profile({ isProfileOpen, toggleProfile }) {
  if (!isProfileOpen) return null; // Do not render if the profile is closed

  return (
    <div className="profile-overlay" onClick={toggleProfile}>
      <div className="profile-window" onClick={(e) => e.stopPropagation()}>
        <ul>
          <li>My Account</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
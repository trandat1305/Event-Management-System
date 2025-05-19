import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaMoon, FaBell, FaSignOutAlt, FaCamera, FaEdit, FaSave, FaTimes, FaEye, FaArrowLeft } from 'react-icons/fa';
import { GrLogout } from "react-icons/gr";
import defaultAvatar from './assets/default-avatar.png';
import './MyAccount.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearAuth } from './store/authSlice';
import { useEffect } from 'react';

function MyAccount() {
  // const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();


  const [userInfo, setUserInfo] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    password: '********',
    avatar: user?.avatar || defaultAvatar,
  });

  const [tempInfo, setTempInfo] = useState({ ...userInfo });
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  /**
  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };
  */

  const handleEditClick = () => {
    setIsEditing(true);
    setTempInfo({ ...userInfo });
  };

  const handleLogout = () => {
    dispatch(clearAuth());
  }

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTempInfo({ ...userInfo });
    navigate('/home');
  };

  const handleSaveEdit = async () => {
  try {
      const formData = new FormData();
      formData.append('username', tempInfo.username);
      formData.append('email', tempInfo.email);
      formData.append('name', tempInfo.name);

      // Only send password if changed
      if (tempInfo.password !== '********') {
        formData.append('password', tempInfo.password);
      }

      // If avatar is a File object, append it; otherwise, skip or handle accordingly
      if (fileInputRef.current && fileInputRef.current.files[0]) {
        formData.append('avatar', fileInputRef.current.files[0]);
      }

      const response = await fetch('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Do NOT set Content-Type; browser will set it automatically for FormData
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setUserInfo({ ...tempInfo });
        setIsEditing(false);
        // Optionally show a success message or update Redux state
      } else {
        alert(data.error || 'Failed to update profile');
      }
    } catch (err) {
      alert('Server error: ' + err.message);
    }
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
        setTempInfo((prev) => ({ ...prev, avatar: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!user || !token) {
      navigate('/home');
    }
  }, [user, token, navigate]);

  return (
    <div className="my-account-container">
      <button className="myaccount-back-btn" onClick={() => navigate('/user')}>
        <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Back
      </button>
      <div className="myaccount-gradient-bg">
        <div className="myaccount-profile-card">
          <div className="myaccount-avatar-section">
            <div className="myaccount-avatar-wrapper">
              <img
                src={userInfo.avatar}
                alt="User Avatar"
                className="myaccount-avatar-img"
              />
              {isEditing && (
                <button
                  onClick={handleAvatarClick}
                  className="myaccount-avatar-edit-btn"
                  title="Change avatar"
                >
                  <FaCamera size={18} />
                </button>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                className="avatar-file-input"
              />
            </div>
            <div className="myaccount-name">{userInfo.name}</div>
          </div>
          <div className="myaccount-info-section">
            <div className="myaccount-info-row">
              <label>Username:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={tempInfo.username}
                  onChange={handleInputChange}
                  className="myaccount-input"
                />
              ) : (
                <span>{userInfo.username}</span>
              )}
            </div>
            <div className="myaccount-info-row">
              <label>Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={tempInfo.email}
                  onChange={handleInputChange}
                  className="myaccount-input"
                />
              ) : (
                <span>{userInfo.email}</span>
              )}
            </div>
            <div className="myaccount-info-row">
              <label>Password:</label>
              {isEditing ? (
                <input
                  type="password"
                  name="password"
                  value={tempInfo.password}
                  onChange={handleInputChange}
                  className="myaccount-input"
                />
              ) : (
                <span>{userInfo.password}</span>
              )}
            </div>
            <div className="myaccount-btn-row">
              {isEditing ? (
                <>
                  <button onClick={handleSaveEdit} className="myaccount-btn myaccount-save-btn"><FaSave /> Save</button>
                  <button onClick={handleCancelEdit} className="myaccount-btn myaccount-cancel-btn"><FaTimes /> Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={handleEditClick} className="myaccount-btn myaccount-edit-btn"><FaEdit /> Edit</button>
                  <button onClick={handleLogout} className="myaccount-btn myaccount-edit-btn"><GrLogout /> Log Out</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
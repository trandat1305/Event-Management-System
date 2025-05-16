import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaHome } from 'react-icons/fa';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <button className="back-btn" type="button" onClick={() => navigate('/home')}>
          <FaHome style={{ marginRight: '0.5rem' }} /> Home
        </button>
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to Eventer</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <div className="input-icon">
              <FaEnvelope />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon">
              <FaLock />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-options">
            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="auth-button">Sign In</button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
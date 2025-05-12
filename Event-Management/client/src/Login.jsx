import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home'); // Navigate to the homepage
  };

  const handleAdminLogin = () => {
    navigate('/admin'); // Navigate to the admin page
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <button type="button" onClick={handleAdminLogin} className="admin-login-button">
          Log in as Admin
        </button>
      </form>
      <p>
        Don't have an account?{' '}
        <button onClick={() => navigate('/signup')}>Sign Up</button>
      </p>
    </div>
  );
}

export default Login;
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Login() {
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
        <button type="button">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </p>
    </div>
  );
}

export default Login;
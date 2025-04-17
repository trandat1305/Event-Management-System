import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function SignUp() {
  return (
    <div className="login-container">
      <h1>Sign Up</h1>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder="Enter your name" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
        <button type="button">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/login">
          <button>Login</button>
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
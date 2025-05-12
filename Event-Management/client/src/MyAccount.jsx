import React from 'react';
import './MyAccount.css'; // Optional: Add styles for the My Account page

function MyAccount() {
  return (
    <div className="my-account-container">
      <h1>My Account</h1>
      <p>Here is your account information:</p>
      <ul>
        <li><strong>Name:</strong> John Doe</li>
        <li><strong>Email:</strong> johndoe@example.com</li>
        <li><strong>Phone:</strong> +123456789</li>
      </ul>
    </div>
  );
}

export default MyAccount;
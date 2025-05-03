import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home'; // Import the Home component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} /> {/* Route for the homepage */}
        <Route path="*" element={<Login />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;

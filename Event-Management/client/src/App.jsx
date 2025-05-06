import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import MyEvents from './MyEvents';
import Events from './Events';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/myevents" element={<MyEvents />} />
        <Route path="/home/events" element={<Events />} />
        <Route path="*" element={<Login />} /> {/* Redirects undefined routes to login */}
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import MyEvents from './MyEvents';
import Events from './Events';
import CreateEvent from './CreateEvent';
import MyAccount from './MyAccount';
import Schedule from './Schedule';
import Notification from './Notification'; // Import the Notification page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/notification" element={<Notification />} /> {/* Home Notification route */}
        <Route path="/home/myevents" element={<MyEvents />} />
        <Route path="/home/myevents/notification" element={<Notification />} /> {/* MyEvents Notification route */}
        <Route path="/home/events" element={<Events />} />
        <Route path="/home/events/notification" element={<Notification />} /> {/* Events Notification route */}
        <Route path="/home/createevent" element={<CreateEvent />} />
        <Route path="/home/schedule" element={<Schedule />} />
        <Route path="*" element={<Login />} />
        <Route path="/myaccount" element={<MyAccount />} /> {/* My Account route */}
      </Routes>
    </Router>
  );
}

export default App;

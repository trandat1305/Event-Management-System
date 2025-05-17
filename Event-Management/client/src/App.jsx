import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import CreateEvent from './CreateEvent';
import MyAccount from './MyAccount';
import Schedule from './Schedule'; // Import the new Schedule component
import Notification from './Notification'; // Import the Notification page
import SignUp from './SignUp';
import Admin from './Admin';
import User from './User'; // Import the User page
import AdminEvents from './AdminEvents'; // Updated import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/notification" element={<Notification />} /> {/* Home Notification route */}        <Route path="/home/myevent/schedule" element={<Schedule />} /> {/* New Route */}
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/home/schedule" element={<Schedule />} />
        <Route path="/myaccount" element={<MyAccount />} /> {/* My Account route */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} /> {/* Admin route */}
        <Route path="/admin/users" element={<User />} /> {/* User route */}
        <Route path="/admin/events" element={<AdminEvents />} /> {/* Updated route */}
        <Route path="/user" element={<User />} /> {/* User dashboard/profile page */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

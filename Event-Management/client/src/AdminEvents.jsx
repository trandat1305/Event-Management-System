import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaUserTie, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AdminEvents.css';

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fake fetch events (replace with real API call if available)
  useEffect(() => {
    setEvents([
      {
        id: 1,
        title: 'Online Game Night',
        startDate: '2025-05-20T18:00:00',
        endDate: '2025-05-20T21:00:00',
        organizer: { name: 'user1', email: 'user1@email.com' },
        status: 'active',
        participants: 80,
        isPublic: true,
      },
      {
        id: 2,
        title: 'Yoga Session',
        startDate: '2025-05-22T08:00:00',
        endDate: '2025-05-22T09:30:00',
        organizer: { name: 'user2', email: 'user2@email.com' },
        status: 'active',
        participants: 30,
        isPublic: true,
      },
      {
        id: 3,
        title: 'Private Strategy Session',
        startDate: '2025-06-01T09:00:00',
        endDate: '2025-06-01T11:00:00',
        organizer: { name: 'admin', email: 'admin@email.com' },
        status: 'active',
        participants: 10,
        isPublic: false,
      },
    ]);
  }, []);

  return (
    <div className="admin-events-bg">
      <div className="admin-events-card">
        <div className="admin-events-header">
          <h1>Quản lý sự kiện</h1>
          <button className="admin-logout-btn" onClick={() => navigate('/login')}>
            <FaSignOutAlt style={{ marginRight: 8 }} /> Logout
          </button>
        </div>
        <div className="admin-events-table-wrapper">
          <table className="admin-events-table">
            <thead>
              <tr>
                <th>Tên sự kiện</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Organizer</th>
                <th>Loại</th>
                <th>Trạng thái</th>
                <th>Tham gia</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{new Date(event.startDate).toLocaleString()}</td>
                  <td>{new Date(event.endDate).toLocaleString()}</td>
                  <td>
                    <FaUserTie style={{ marginRight: 4, color: '#646cff' }} />
                    {event.organizer.name} <br />
                    <span className="admin-events-organizer-email">{event.organizer.email}</span>
                  </td>
                  <td>
                    <span className={event.isPublic ? 'public-badge' : 'private-badge'}>
                      {event.isPublic ? 'Public' : 'Private'}
                    </span>
                  </td>
                  <td>
                    <span className={event.status === 'active' ? 'active-badge' : 'inactive-badge'}>
                      {event.status}
                    </span>
                  </td>
                  <td>
                    <FaUser style={{ marginRight: 4, color: '#ff6b6b' }} />
                    {event.participants}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="admin-events-actions">
          <button className="admin-events-back-btn" onClick={() => navigate('/admin')}>
            <FaCalendarAlt style={{ marginRight: 8 }} /> Về dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminEvents;
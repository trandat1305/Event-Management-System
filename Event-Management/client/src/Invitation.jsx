import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const attendeeInvitesMock = [
  {
    id: 1,
    event: 'ReactJS Meetup 2025',
    inviter: 'Alice',
    date: '2025-05-20',
  },
  {
    id: 2,
    event: 'Music Festival',
    inviter: 'Bob',
    date: '2025-06-10',
  },
];

const organizerInvitesMock = [
  {
    id: 3,
    event: 'Tech Startup Pitch',
    inviter: 'Carol',
    date: '2025-06-15',
  },
];

// Mock data cho lời mời đã gửi
const sentInvitesMock = [
  {
    id: 10,
    eventName: 'ReactJS Meetup 2025',
    role: 'attendee',
    recipients: [
      { username: 'Bob', rsvp: 'pending' },
      { username: 'Carol', rsvp: 'accepted' },
      { username: 'David', rsvp: 'declined' },
    ],
  },
  {
    id: 11,
    eventName: 'Tech Startup Pitch',
    role: 'organizer',
    recipients: [
      { username: 'Eve', rsvp: 'pending' },
      { username: 'Frank', rsvp: 'accepted' },
    ],
  },
];

function Invitation() {
  const [attendeeInvites, setAttendeeInvites] = useState(attendeeInvitesMock);
  const [organizerInvites, setOrganizerInvites] = useState(organizerInvitesMock);
  const [sentInvites] = useState(sentInvitesMock);
  const [tab, setTab] = useState('received');
  const navigate = useNavigate();

  const handleAction = (type, id, action) => {
    if (type === 'attendee') {
      setAttendeeInvites(invites => invites.filter(inv => inv.id !== id));
    } else {
      setOrganizerInvites(invites => invites.filter(inv => inv.id !== id));
    }
    alert(`${action === 'accept' ? 'Đã chấp nhận' : 'Đã từ chối'} lời mời! (Demo UI)`);
  };

  return (
    <div className="home-container float-in-discover" style={{ minHeight: '100vh', paddingTop: 80 }}>
      <button
        className="back-btn-discover"
        style={{ position: 'absolute', left: 32, top: 24, zIndex: 10 }}
        onClick={() => navigate('/user')}
      >
        <FaArrowLeft style={{ marginRight: 6 }} /> Back
      </button>
      <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 32 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 32, color: '#f05537' }}>Invitations</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 32 }}>
          <button
            className={tab === 'received' ? 'book-now-btn' : 'cancel-button'}
            style={{ padding: '7px 28px', fontSize: 16, border: tab === 'received' ? 'none' : '1.5px solid #f05537', color: tab === 'received' ? '#fff' : '#f05537', background: tab === 'received' ? 'var(--primary-color)' : 'none', fontWeight: 600 }}
            onClick={() => setTab('received')}
          >
            Sent ({sentInvites.reduce((sum, event) => sum + event.recipients.length, 0)})
          </button>
          <button
            className={tab === 'sent' ? 'book-now-btn' : 'cancel-button'}
            style={{ padding: '7px 28px', fontSize: 16, border: tab === 'sent' ? 'none' : '1.5px solid #f05537', color: tab === 'sent' ? '#fff' : '#f05537', background: tab === 'sent' ? 'var(--primary-color)' : 'none', fontWeight: 600 }}
            onClick={() => setTab('sent')}
          >
            Received ({attendeeInvites.length + organizerInvites.length})
          </button>
        </div>
        {tab === 'received' ? (
          <>
            <div style={{ marginBottom: 32 }}>
              <h3 style={{ color: '#333', marginBottom: 16 }}>Attendee Invitations</h3>
              {attendeeInvites.length === 0 ? <div style={{ color: '#888' }}>No attendee invitations.</div> : (
                attendeeInvites.map(invite => (
                  <div key={invite.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8f9fa', borderRadius: 8, padding: 16, marginBottom: 12 }}>
                    <div>
                      <b>{invite.event}</b> <span style={{ color: '#888', fontSize: 13 }}>({invite.date})</span><br/>
                      <span style={{ color: '#666', fontSize: 14 }}>Invited by: {invite.inviter}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="book-now-btn" style={{ padding: '6px 18px', fontSize: 15 }} onClick={() => handleAction('attendee', invite.id, 'accept')}>Accept</button>
                      <button className="cancel-button" style={{ padding: '6px 18px', fontSize: 15, border: '1.5px solid #f05537', color: '#f05537', background: 'none' }} onClick={() => handleAction('attendee', invite.id, 'decline')}>Decline</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div>
              <h3 style={{ color: '#333', marginBottom: 16 }}>Organizer Invitations</h3>
              {organizerInvites.length === 0 ? <div style={{ color: '#888' }}>No organizer invitations.</div> : (
                organizerInvites.map(invite => (
                  <div key={invite.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8f9fa', borderRadius: 8, padding: 16, marginBottom: 12 }}>
                    <div>
                      <b>{invite.event}</b> <span style={{ color: '#888', fontSize: 13 }}>({invite.date})</span><br/>
                      <span style={{ color: '#666', fontSize: 14 }}>Invited by: {invite.inviter}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="book-now-btn" style={{ padding: '6px 18px', fontSize: 15 }} onClick={() => handleAction('organizer', invite.id, 'accept')}>Accept</button>
                      <button className="cancel-button" style={{ padding: '6px 18px', fontSize: 15, border: '1.5px solid #f05537', color: '#f05537', background: 'none' }} onClick={() => handleAction('organizer', invite.id, 'decline')}>Decline</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <div>
            <h3 style={{ color: '#333', marginBottom: 16 }}>Invitations Sent</h3>
            {sentInvites.length === 0 ? <div style={{ color: '#888' }}>No invitations sent.</div> : (
              sentInvites.map(event => (
                <div key={event.id} style={{ background: '#f8f9fa', borderRadius: 8, padding: 18, marginBottom: 18 }}>
                  <b>{event.eventName}</b> <span style={{ color: '#888', fontSize: 13 }}>({event.role === 'attendee' ? 'Attendee' : 'Organizer'})</span>
                  <ul style={{ margin: '12px 0 0 0', padding: 0, listStyle: 'none' }}>
                    {event.recipients.map(recipient => (
                      <li key={recipient.username} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <span style={{ fontWeight: 500 }}>{recipient.username}</span>
                        <span className={`rsvp-status ${recipient.rsvp}`} style={{ fontWeight: 600, textTransform: 'capitalize' }}>{recipient.rsvp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <style>{`
        .rsvp-status.accepted { color: #27ae60; }
        .rsvp-status.declined { color: #e74c3c; }
        .rsvp-status.pending { color: #f39c12; }
      `}</style>
    </div>
  );
}

export default Invitation; 
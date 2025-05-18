import React, { useState } from 'react';
import './Invite.css';

function Invite({ eventId, onClose }) {
  const [inviteeEmails, setInviteeEmails] = useState('');

  const handleSendInvites = () => {
    const emails = inviteeEmails.split('\n').filter(email => email.trim());
    if (emails.length > 0) {
      console.log(`Sending invitations for event ${eventId} to:`, emails);
      alert(`Invitations sent to: ${emails.join(', ')}`);
      setInviteeEmails('');
    }
  };

  return (
    <div className="invite-modal">
      <div className="invite-content">
        <button className="close-btn" onClick={onClose}>Close</button>
        <h3>Invite to Event</h3>
        <div className="new-invite">
          <textarea
            placeholder="Enter email addresses, one per line"
            value={inviteeEmails}
            onChange={(e) => setInviteeEmails(e.target.value)}
          ></textarea>
          <button onClick={handleSendInvites}>Send Invitations</button>
        </div>
      </div>
    </div>
  );
}

export default Invite;
import React, { useState } from 'react';
import axios from 'axios';
import './Message.css';

function Message({ message, eventId }) {
  const [reply, setReply] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  // Handle posting a reply
  const handleReply = async () => {
    if (!reply.trim()) return;

    try {
      const response = await axios.post(`/api/events/${eventId}/messages/${message._id}`, { message: reply });
      message.replies = [...(message.replies || []), response.data];
      setReply('');
      setShowReplyBox(false);
    } catch (err) {
      console.error('Failed to post reply:', err);
    }
  };

  return (
    <div className="message">
      <p>
        <strong>{message.userId.username}:</strong> {message.content}
      </p>
      {message.imageURL && <img src={message.imageURL} alt="Attached" className="message-image" />}
      <div className="message-actions">
        <button onClick={() => setShowReplyBox(!showReplyBox)}>Reply</button>
      </div>

      {/* Reply Box */}
      {showReplyBox && (
        <div className="reply-box">
          <textarea
            placeholder="Write a reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          ></textarea>
          <button onClick={handleReply}>Post Reply</button>
        </div>
      )}

      {/* Replies */}
      {message.replies && (
        <div className="replies">
          {message.replies.map((reply) => (
            <Message key={reply._id} message={reply} eventId={eventId} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Message;
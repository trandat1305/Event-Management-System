import React, { useState, useEffect } from 'react';
import axios from "axios";
import Message from './Message';
import './DiscussionBoard.css';

function DiscussionBoard({ eventId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch messages when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/events/${eventId}/messagesIncludingReplies`);
        setMessages(response.data);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [eventId]);

  // Handle posting a new message
  const handlePostMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(`/api/events/${eventId}/messages`, { message: newMessage });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (err) {
      console.error('Failed to post message:', err);
    }
  };

  return (
    <div className="discussion-board">
      <h3>Discussion Board</h3>

      {/* New Message Input */}
      <div className="new-message">
        <textarea
          placeholder="Write a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button onClick={handlePostMessage}>Post</button>
      </div>

      {/* Messages */}
      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <div className="messages">
          {messages.map((message) => (
            <Message key={message._id} message={message} eventId={eventId} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DiscussionBoard;
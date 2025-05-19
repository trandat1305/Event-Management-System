import React, { useState, useEffect } from 'react';
import './DiscussionBoard.css';
import { useSelector } from 'react-redux';

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function DiscussionBoard({ eventId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const token = useSelector(state => state.auth.token);

  // Fetch discussions when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/discussions/${eventId}/messages`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log('Fetched discussion data:', data);
        
        if (Array.isArray(data.messages)) {
          const decodedMessages = data.messages.map(message => ({
            ...message,
            content: decodeHtml(message.content)
          }));
          setMessages(decodedMessages);
        }
      } catch (err) {
        console.error('Failed to fetch discussions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [eventId, token]);

  // Handle posting a new discussion
  const handlePostMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(`http://localhost:3000/api/discussions/${eventId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: newMessage })
      });

      if (!response.ok) {
        throw new Error('Failed to post message');
      }

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...data.message, content: decodeHtml(data.message.content) }
      ]);
    } catch (err) {
      console.error('Failed to post message:', err);
    }

    setNewMessage('');
  };

  return (
    <div className="discussion-board">
      <h3>Discussion Board</h3>
      {/* New Message Input */}
      <div className="new-message">
        <textarea
          placeholder="Write a comment..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button onClick={handlePostMessage}>Post</button>
      </div>
      {/* Discussions */}
      {loading ? (
        <p>Loading discussions...</p>
      ) : (
        <div className="messages">
          {messages.map((discussion) => (
            <div key={discussion._id} className="discussion-comment">
              <strong>{discussion.author?.username || 'User'}:</strong> {discussion.content}
              {/* Replies */}
              {discussion.replies && discussion.replies.length > 0 && (
                <div className="discussion-replies">
                  {discussion.replies.map(reply => (
                    <div key={reply._id} className="discussion-reply">
                      <strong>{reply.author?.username || 'User'}:</strong> {reply.content}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DiscussionBoard;
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './DiscussionBoard.css';

function DiscussionBoard({ eventId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch discussions when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        // Giả lập API, bạn có thể thay bằng API thực tế
        // const response = await axios.get(`/api/discussions/event/${eventId}`);
        // setMessages(response.data);
        setMessages([
          {
            _id: '1',
            author: { username: 'Alice' },
            content: 'Sự kiện này rất tuyệt!',
            replies: [
              { _id: '1-1', author: { username: 'Bob' }, content: 'Đồng ý!' }
            ]
          },
          {
            _id: '2',
            author: { username: 'Carol' },
            content: 'Có cần chuẩn bị gì không?',
            replies: []
          }
        ]);
      } catch (err) {
        console.error('Failed to fetch discussions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [eventId]);

  // Handle posting a new discussion
  const handlePostMessage = async () => {
    if (!newMessage.trim()) return;
    // Gửi API tạo discussion mới ở đây
    setMessages([
      ...messages,
      {
        _id: Date.now().toString(),
        author: { username: 'You' },
        content: newMessage,
        replies: []
      }
    ]);
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
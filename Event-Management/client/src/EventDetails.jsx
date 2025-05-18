import React, { useState } from 'react';
import './EventDetails.css';
import DiscussionBoard from './DiscussionBoard';

function EventDetails({ event, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editEvent, setEditEvent] = useState({ ...event });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Ở đây bạn có thể gọi API cập nhật event nếu muốn
    setIsEditing(false);
    // Có thể gọi callback để cập nhật event ở ngoài nếu cần
  };

  return (
    <div className="event-details-modal float-in">
      <div className="event-details-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        {isEditing ? (
          <>
            <h2 className="edit-event-title">Chỉnh sửa sự kiện</h2>
            <form className="edit-event-form" onSubmit={e => { e.preventDefault(); handleSave(); }}>
              <div className="form-group">
                <label htmlFor="edit-title">Tên sự kiện</label>
                <input
                  id="edit-title"
                  className="event-edit-input"
                  name="title"
                  value={editEvent.title}
                  onChange={handleEditChange}
                  placeholder="Nhập tên sự kiện"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-description">Mô tả</label>
                <textarea
                  id="edit-description"
                  className="event-edit-input"
                  name="description"
                  value={editEvent.description}
                  onChange={handleEditChange}
                  placeholder="Mô tả chi tiết sự kiện"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edit-start">Thời gian bắt đầu</label>
                  <input
                    id="edit-start"
                    className="event-edit-input"
                    name="startTime"
                    type="datetime-local"
                    value={editEvent.startTime?.slice(0, 16) || ''}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-end">Thời gian kết thúc</label>
                  <input
                    id="edit-end"
                    className="event-edit-input"
                    name="endTime"
                    type="datetime-local"
                    value={editEvent.endTime?.slice(0, 16) || ''}
                    onChange={handleEditChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="edit-location">Địa điểm</label>
                <input
                  id="edit-location"
                  className="event-edit-input"
                  name="location"
                  value={editEvent.location}
                  onChange={handleEditChange}
                  placeholder="Nhập địa điểm"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Hủy</button>
                <button type="submit" className="save-button">Lưu</button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2>{editEvent.title}</h2>
            {editEvent.imageURL && <img src={editEvent.imageURL} alt={editEvent.title} className="event-image" />}
            <p>
              <strong>Description:</strong> {editEvent.description}
            </p>
            <p>
              <strong>Start Time:</strong> {new Date(editEvent.startTime).toLocaleString()}
            </p>
            <p>
              <strong>End Time:</strong> {new Date(editEvent.endTime).toLocaleString()}
            </p>
            <p>
              <strong>Location:</strong> {editEvent.location}
            </p>
            <p>
              <strong>Public:</strong> {editEvent.isPublic ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Creator:</strong> {editEvent.creator}
            </p>
            {event.type === 'organizer' && (
              <div className="event-details-buttons">
                <button className="join-button" onClick={() => setIsEditing(true)}>Edit</button>
              </div>
            )}
          </>
        )}
        <div className="event-details-discussion-wrapper">
          <DiscussionBoard eventId={event.id} />
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
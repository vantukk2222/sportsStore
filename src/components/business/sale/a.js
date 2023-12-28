// EditEventPage.js
import React, { useState } from 'react';

const EditEventPage = ({ editedEvent, onUpdate, onCancel }) => {
  const [editedEventData, setEditedEventData] = useState(editedEvent);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    onUpdate(editedEventData);
    // Additional logic for updating the event, if needed
  };

  return (
    <div className="edit-event-page">
      <h2>Cập nhật thông tin sự kiện</h2>
      <div className="edit-event-form">
        <div className="form-row">
          <label htmlFor="eventName">Tên sự kiện:</label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={editedEventData?.eventName || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="eventCode">Mã sự kiện:</label>
          <input
            type="text"
            id="eventCode"
            name="eventCode"
            value={editedEventData?.eventCode || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="discount">Giảm giá:</label>
          <input
            type="text"
            id="discount"
            name="discount"
            value={editedEventData?.discount || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="fromDate">Từ ngày:</label>
          <input
            type="text"
            id="fromDate"
            name="fromDate"
            value={editedEventData?.fromDate || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="toDate">Đến ngày:</label>
          <input
            type="text"
            id="toDate"
            name="toDate"
            value={editedEventData?.toDate || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-actions">
        <button onClick={handleUpdate}>Lưu</button>
        <button onClick={onCancel}>Hủy</button>
      </div>
    </div>
  );
};

export default EditEventPage;

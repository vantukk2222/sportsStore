import React, { useState } from 'react';
import './sale.css';

const SaleAdd = () => {
  const [eventData, setEventData] = useState({
    eventCode: '',
    eventName: '',
    img: '',
    discount: '',
    fromDate: '',
    toDate: '',
  });

  const handleAddEvent = () => {
    console.log('Event Data:', eventData);
  };

  const handleChange = (field, value) => {
    setEventData((prevEventData) => ({
      ...prevEventData,
      [field]: value,
    }));
  };

  return (
    <div className="sale-add-container">
      <h1>Thêm sự kiện</h1>
      <div className="form-group">
        <label htmlFor="eventCode">Mã sự kiện:</label>
        <input
          type="text"
          id="eventCode"
          value={eventData.eventCode}
          onChange={(e) => handleChange('eventCode', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="eventName">Tên sự kiện:</label>
        <input
          type="text"
          id="eventName"
          value={eventData.eventName}
          onChange={(e) => handleChange('eventName', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="img">Hình ảnh:</label>
        <input
          type="file" 
          id="img"
          accept="image/*" 
          onChange={(e) => handleChange('img', e.target.files[0])} s
        />
      </div>
      <div className="form-group">
        <label htmlFor="discount">Giảm giá:</label>
        <input
          type="text"
          id="discount"
          value={eventData.discount}
          onChange={(e) => handleChange('discount', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fromDate">Từ ngày:</label>
        <input
          type="date" 
          id="fromDate"
          value={eventData.fromDate}
          onChange={(e) => handleChange('fromDate', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="toDate">Đến ngày:</label>
        <input
          type="date" 
          id="toDate"
          value={eventData.toDate}
          onChange={(e) => handleChange('toDate', e.target.value)}
        />
      </div>
      <button className="add-button" onClick={handleAddEvent}>
        Thêm sự kiện
      </button>
    </div>
  );
};

export default SaleAdd;

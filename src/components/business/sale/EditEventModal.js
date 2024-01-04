// EditEventModal.js
import { useEffect, useState } from 'react';

const EditEventModal = ({ event, onClose, onSave }) => {
    const [editedEvent, setEditedEvent] = useState({
        id_business: event.businessResponse.id,
        name: event.name,
        discount: `${event.discount}%`,
        started_at: event.started_at,
        ended_at: event.ended_at,
    });

    const handleEditEvent = () => {
        onSave(event.id, editedEvent);
          onClose();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEvent({ ...editedEvent, [name]: value });
    };
   
    return (
        <div className="modal-overlay">
            <div className="modalnewproduct">
                <h2>Sửa sự kiện</h2>
                {/* <div className="form-group">
                    <label htmlFor="eventCode">Mã sự kiện:</label>
                    <input type="text" id="eventCode" name="eventCode" value={editedEvent.eventCode} readOnly />
                </div> */}
                <div className="form-group">
                    <label htmlFor="name">Tên sự kiện:</label>
                    <input type="text" id="name" name="name" value={editedEvent.name} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="discount">Giảm giá:</label>
                    <input
                        type="text"
                        id="discount"
                        name="discount"
                        value={editedEvent.discount}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="started_at">Từ ngày:</label>
                    <input
                        type="text"
                        id="started_at"
                        name="started_at"
                        value={editedEvent.started_at}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ended_at">Đến ngày:</label>
                    <input
                        type="text"
                        id="ended_at"
                        name="ended_at"
                        value={editedEvent.ended_at}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="modal-buttons">
                    <button onClick={handleEditEvent}>Lưu</button>
                    <button onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default EditEventModal;

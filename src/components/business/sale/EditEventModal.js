// EditEventModal.js
import { useEffect, useState } from 'react';

const EditEventModal = ({ event, onClose, onSave }) => {
    const [editedEvent, setEditedEvent] = useState({
        eventCode: '',
        eventName: '',
        img: '',
        discount: '',
        fromDate: '',
        toDate: '',
    });

    useEffect(() => {
        setEditedEvent({
            eventCode: event.eventCode,
            eventName: event.eventName,
            img: event.img,
            discount: event.discount,
            fromDate: event.fromDate,
            toDate: event.toDate,
        });
    }, [event]);

    const handleEditEvent = () => {
        onSave(editedEvent);
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
                <div className="form-group">
                    <label htmlFor="eventCode">Mã sự kiện:</label>
                    <input type="text" id="eventCode" name="eventCode" value={editedEvent.eventCode} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="eventName">Tên sự kiện:</label>
                    <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        value={editedEvent.eventName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="img">Hình ảnh:</label>
                    <input type="text" id="img" name="img" value={editedEvent.img} onChange={handleInputChange} />
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
                    <label htmlFor="fromDate">Từ ngày:</label>
                    <input
                        type="text"
                        id="fromDate"
                        name="fromDate"
                        value={editedEvent.fromDate}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="toDate">Đến ngày:</label>
                    <input
                        type="text"
                        id="toDate"
                        name="toDate"
                        value={editedEvent.toDate}
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

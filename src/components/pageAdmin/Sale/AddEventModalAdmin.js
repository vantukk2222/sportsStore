import { useState } from 'react';

const AddEventModal = ({ onClose, onSave }) => {
    const [newEvent, setNewEvent] = useState({
        eventCode: '',
        eventName: '',
        img: '',
        discount: '',
        fromDate: '',
        toDate: '',
    });

    const handleAddEvent = () => {
        onSave(newEvent);
        onClose();
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            const file = e.target.files[0];
            if (file) {
                setNewEvent({ ...newEvent, [name]: URL.createObjectURL(file) });
            }
        } else {
            setNewEvent({ ...newEvent, [name]: value });
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modalnewproduct">
                <h2>Thêm sự kiện</h2>
                <div className="form-group">
                    <label htmlFor="eventCode">Mã sự kiện:</label>
                    <input
                        type="text"
                        id="eventCode"
                        name="eventCode"
                        value={newEvent.eventCode}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventName">Tên sự kiện:</label>
                    <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        value={newEvent.eventName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="discount">Giảm giá:</label>
                    <input
                        type="text"
                        id="discount"
                        name="discount"
                        value={newEvent.discount}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fromDate">Từ ngày:</label>
                    <input
                        type="text"
                        id="fromDate"
                        name="fromDate"
                        value={newEvent.fromDate}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="toDate">Đến ngày:</label>
                    <input type="text" id="toDate" name="toDate" value={newEvent.toDate} onChange={handleInputChange} />
                </div>
                <div className="modal-buttons">
                    <button onClick={handleAddEvent}>Thêm</button>
                    <button onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default AddEventModal;

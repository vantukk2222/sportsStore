import { useState } from 'react';

const AddEventModal = ({ onClose, onSave }) => {
    const [newEvent, setNewEvent] = useState({
        id_business: JSON.parse(localStorage.getItem('User')).id,
        name: '',
        discount: '',
        started_at: '',
        ended_at: '',
    });

    const handleAddEvent = () => {
        onSave(newEvent);
        onClose();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setNewEvent({ ...newEvent, [name]: value });
    };

    return (
        <div className="modal-overlay">
            <div className="modalnewproduct">
                <h2>Thêm sự kiện</h2>
                {/* <div className="form-group">
                    <label htmlFor="eventCode">Mã sự kiện:</label>
                    <input
                        type="text"
                        id="eventCode"
                        name="eventCode"
                        value={newEvent.eventCode}
                        onChange={handleInputChange}
                    />
                </div> */}
                <div className="form-group">
                    <label htmlFor="name">Tên sự kiện:</label>
                    <input type="text" id="name" name="name" value={newEvent.name} onChange={handleInputChange} />
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
                    <label htmlFor="started_at">Từ ngày:</label>
                    <input
                        type="text"
                        id="started_at"
                        name="started_at"
                        value={newEvent.started_at}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ended_at">Đến ngày:</label>
                    <input
                        type="text"
                        id="ended_at"
                        name="ended_at"
                        value={newEvent.ended_at}
                        onChange={handleInputChange}
                    />
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

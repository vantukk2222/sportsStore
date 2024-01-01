import { useState } from 'react';

const AddEventModal = ({ onClose, onSaveEvent }) => {
    const [selectedEvent, setSelectedEvent] = useState('');
    const eventData = [
        { id: 1, name: 'Flash Sale', description: 'Special discounts on various items' },
        { id: 2, name: 'Product Launch', description: 'Introducing exciting new products' },
        { id: 3, name: 'Clearance Sale', description: 'Clearance prices on last season items' },
    ];
    const handleSave = () => {
        onSaveEvent(selectedEvent);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modalnewproduct" style={{ width: '400px' }}>
                <span className="close" onClick={onClose}>
                    &times;
                </span>

                <h2>Thêm sự kiện</h2>

                <div className="form-group">
                    <label>Tên sự kiện:</label>
                    <select
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                        style={{
                            padding: '10px',
                            width: '200px',
                            margin: '10px 0',
                            textAlign: 'center',
                            fontSize: '16px',
                        }}
                    >
                        <option value="">Chọn sự kiện</option>
                        {eventData.map((event) => (
                            <option key={event.id} value={event.name}>
                                {event.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button onClick={handleSave}>Lưu</button>
            </div>
        </div>
    );
};

export default AddEventModal;

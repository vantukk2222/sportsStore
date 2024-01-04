import { useEffect, useState } from 'react';
import getUnAuth from '~/API/get';

const AddEventModal = ({ onClose, onSaveEvent }) => {
    const [selectedEvent, setSelectedEvent] = useState('');
    const [id, setId] = useState(0);
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const user = JSON.parse(localStorage.getItem('User'));
                const response = await getUnAuth(`sale/get-by-business${user.id}`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }

                response.content = response.content.map((e) => {
                    let givenTimeStr = e.ended_at;
                    const givenTime = new Date(givenTimeStr);
                    const currentTime = new Date();

                    if (givenTime > currentTime) return e;
                });

                setId(response.content.find((e) => e.id != undefined).id);
                setEventData(response.content);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
   
    return (
        <div className="modal-overlay">
            <div className="modalnewproduct" style={{ width: '400px' }}>
                <h2>Thêm sự kiện</h2>
                <div className="form-group">
                    <label>Tên sự kiện:</label>
                    <select
                        value={selectedEvent}
                        onChange={(e) => {
                            setId(e.target.options[e.target.selectedIndex].id);
                            setSelectedEvent(e.target.value);
                        }}
                        style={{
                            padding: '10px',
                            width: '200px',
                            margin: '10px 0',
                            textAlign: 'center',
                            fontSize: '16px',
                        }}
                    >
                        {/* <option value="">Chọn sự kiện</option> */}
                        {eventData.map((event) => {
                            if (event)
                                return (
                                    <option key={event.id} id={event.id} value={event.name}>
                                        {event.name}
                                    </option>
                                );
                        })}
                    </select>
                </div>
                <button onClick={() => onSaveEvent(id)}>Lưu</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={onClose} style={{ paddingLeft: '20px' }}>
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default AddEventModal;

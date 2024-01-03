import { useEffect, useState } from 'react';
import AddEventModal from './AddEventModal';
import EditEventModal from './EditEventModal';
import getUnAuth from '~/API/get';
import { putSale } from '~/API/putSale';
import { postSale } from '~/API/postSale';
import deleteSale from '~/API/deleteSale';

const Sale = () => {
    const [eventInfo, setEventInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchData = async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem('User'));
            const response = await getUnAuth(`sale/get-by-business${user.id}`);
            if (!response) {
                throw new Error('Network response was not ok');
            }
            console.log(response.content);
            response.content.map((e) => {
                const start = new Date(e.started_at);
                const end = new Date(e.ended_at);
                e.started_at = `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}`;
                e.ended_at = `${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}`;
            });
            setEventInfo(response.content);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const change = (date) => {
        const [ngay, thang, nam] = date.split('/');
        let cdate = new Date(nam, thang - 1, ngay);
        cdate.setHours(3);
        cdate.setMinutes(12);
        cdate.setSeconds(11);
        cdate.setUTCHours(cdate.getUTCHours() + 7);
        cdate = cdate.toISOString();
        return cdate;
    };
    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleOpenEditModal = (event) => {
        setSelectedEvent(event);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setSelectedEvent(null);
        setIsEditModalOpen(false);
    };

    const handleAddEvent = (newEvent) => {
        console.log(newEvent);
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        newEvent.started_at = change(newEvent.started_at);
        newEvent.ended_at = change(newEvent.ended_at);
        newEvent.discount = parseInt(newEvent.discount);
        postSale(newEvent, authToken).then(fetchData);
    };

    const handleEditEvent = (id, editedEvent) => {
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        editedEvent.started_at = change(editedEvent.started_at);
        editedEvent.ended_at = change(editedEvent.ended_at);
        editedEvent.discount = parseInt(editedEvent.discount.split(-1, 1));
        putSale(id, editedEvent, authToken).then(fetchData);
    };

    const handleDeleteEvent = (id) => {
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        deleteSale(id, authToken).then(fetchData);
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="track-container">
            <h2>Quản lý sự kiện</h2>

            <button className="submit" onClick={handleOpenAddModal}>
                Thêm sự kiện
            </button>
            <div className="tracking-headersale">
                <div>Tên sự kiện</div>
                <div>Giảm giá</div>
                <div>Từ ngày</div>
                <div>Đến ngày</div>
                <div>Thao tác</div>
            </div>

            {eventInfo.map((event, index) => {
                return (
                    <div className="tracking-infosale" key={index}>
                        <div>{event.name}</div>
                        <div>{event.discount}%</div>
                        <div>{event.started_at}</div>
                        <div>{event.ended_at}</div>
                        <div>
                            <button className="delete" onClick={() => handleDeleteEvent(event.id)}>
                                Xóa
                            </button>
                            <button className="edit" onClick={() => handleOpenEditModal(event)}>
                                Sửa
                            </button>
                        </div>
                    </div>
                );
            })}

            {isAddModalOpen && <AddEventModal onClose={handleCloseAddModal} onSave={handleAddEvent} />}
            {isEditModalOpen && (
                <EditEventModal event={selectedEvent} onClose={handleCloseEditModal} onSave={handleEditEvent} />
            )}
        </div>
    );
};

export default Sale;

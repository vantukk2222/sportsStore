import { useState } from 'react';
import AddEventModal from './AddEventModalAdmin';
import EditEventModal from './EditEventModalAdmin';

const SaleAdmin = () => {
    const [eventInfo, setEventInfo] = useState([
        {
            eventCode: 'EVT123',
            eventName: 'Khuyến mãi giày',
            discount: '20%',
            fromDate: '01 Tháng 12, 2023',
            toDate: '10 Tháng 12, 2023',
        },
        {
            eventCode: 'EVT456',
            eventName: 'Sự kiện áo hè',
            discount: '30%',
            fromDate: '05 Tháng 12, 2023',
            toDate: '20 Tháng 12, 2023',
        },
    ]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

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
        setEventInfo([...eventInfo, newEvent]);
        handleCloseAddModal();
    };

    const handleEditEvent = (editedEvent) => {
        const index = eventInfo.findIndex((event) => event.eventCode === editedEvent.eventCode);

        if (index !== -1) {
            const updatedEventInfo = [...eventInfo];
            updatedEventInfo[index] = editedEvent;

            setEventInfo(updatedEventInfo);
        }

        handleCloseEditModal();
    };

    const handleDeleteEvent = (eventCode) => {
        const updatedEventInfo = eventInfo.filter((event) => event.eventCode !== eventCode);
        setEventInfo(updatedEventInfo);
    };

    return (
        <div className="track-container">
            <h2>Quản lý sự kiện</h2>

            <button className="submit" onClick={handleOpenAddModal}>
                Thêm sự kiện
            </button>
            <div className="tracking-headersale">
                <div>Mã sự kiện</div>
                <div>Tên sự kiện</div>
                <div>Giảm giá</div>
                <div>Từ ngày</div>
                <div>Đến ngày</div>
                <div>Thao tác</div>
            </div>

            {eventInfo.map((event, index) => (
                <div className="tracking-infosale" key={index}>
                    <div>{event.eventCode}</div>
                    <div>{event.eventName}</div>
                    <div>{event.discount}</div>
                    <div>{event.fromDate}</div>
                    <div>{event.toDate}</div>
                    <div>
                        <button className="delete" onClick={() => handleDeleteEvent(event.eventCode)}>
                            Xóa
                        </button>
                        <button className="edit" onClick={() => handleOpenEditModal(event)}>
                            Sửa
                        </button>
                    </div>
                </div>
            ))}

            {isAddModalOpen && <AddEventModal onClose={handleCloseAddModal} onSave={handleAddEvent} />}
            {isEditModalOpen && (
                <EditEventModal event={selectedEvent} onClose={handleCloseEditModal} onSave={handleEditEvent} />
            )}
        </div>
    );
};

export default SaleAdmin;

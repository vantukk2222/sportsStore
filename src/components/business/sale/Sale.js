import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sale = () => {
    const [eventInfo, setEventInfo] = useState([
        {
            eventCode: 'EVT123',
            eventName: 'Khuyến mãi giày',
            img: 'event1.png',
            discount: '20%',
            fromDate: '01 Tháng 12, 2023',
            toDate: '10 Tháng 12, 2023',
        },
        {
            eventCode: 'EVT456',
            eventName: 'Sự kiện áo hè',
            img: 'event2.png',
            discount: '30%',
            fromDate: '05 Tháng 12, 2023',
            toDate: '20 Tháng 12, 2023',
        },
    ]);

    const handleViewProduct = (eventCode) => {
        console.log(`View product with event code: ${eventCode}`);
    };

    const handleEditProduct = (eventCode) => {
        console.log(`Edit product with event code: ${eventCode}`);
    };

    const handleDeleteProduct = (eventCode) => {
        console.log(`Delete product with event code: ${eventCode}`);
    };

    return (
        <div className="track-container">
       <Link to="/addsale">
        <button className='action-button'>Thêm sự kiện</button>
      </Link>
            <div className="tracking-header">
                <div>Mã sự kiện</div>
                <div>Tên sự kiện</div>
                <div>Hình ảnh</div>
                <div>Giảm giá</div>
                <div>Từ ngày</div>
                <div>Đến ngày</div>
                <div>Action</div>
            </div>

            {eventInfo.map((event, index) => (
                <div className="tracking-info" key={index}>
                    <div>{event.eventCode}</div>
                    <div>{event.eventName}</div>
                    <div>
                        <img src={event.img} alt={`Event ${index + 1}`} />
                    </div>
                    <div>{event.discount}</div>
                    <div>{event.fromDate}</div>
                    <div>{event.toDate}</div>
                    <div>
                    <Link to="/viewsale">
        <button className='action-button'>Xem</button>
      </Link>
      <Link to="/editsale">
        <button className='action-button'>Sửa</button>
      </Link>
                   
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Sale;

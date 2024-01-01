import React, { useState } from 'react';
import MenuAdmin from '../MenuAdmin';
import TrackAdmin from './TrackAdmin';

const AdminTrack = () => {
    const [orderStatus, setOrderStatus] = useState('Tất cả');

    const [orders] = useState([
        {
            id: 'Bussiness1',
            date: '2023-11-26',
            items: [
                {
                    id: 1, name: 'Giày thể thao đá bóng', quantity: 2, price: 10, 
                    img: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/10/30/969136/Cristiano-Ronaldo4.jpg', size: "XL",
                    detail: "giày nam số một thị trường dành cho nhưng cầu thủ, sử dụng cho môi trường làm việc với công suất lớn "
                },
                {
                    id: 2, name: 'Giày thể thao đá bóng', quantity: 1, price: 20, img: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/10/30/969136/Cristiano-Ronaldo4.jpg', size: "XL",
                    detail: "giày nam số một thị trường dành cho nhưng cầu thủ, sử dụng cho môi trường làm việc với công suất lớn "
                },
            ],
            total: 50,
            state: "Đang giao hàng"
        },
        {
            id: 'Bussiness2',
            date: '2023-11-26',
            items: [
                {
                    id: 1, name: 'Giày thể thao đá bóng', quantity: 2, price: 10, img: 'logo.png', size: "XL",
                    detail: "giày nam số một thị trường dành cho nhưng cầu thủ, sử dụng cho môi trường làm việc với công suất lớn "
                },
                {
                    id: 2, name: 'Giày thể thao đá bóng', quantity: 1, price: 20, img: 'logo.png', size: "XL",
                    detail: "giày nam số một thị trường dành cho nhưng cầu thủ, sử dụng cho môi trường làm việc với công suất lớn "
                },
                // Add more items
            ],
            total: 50,
            state: "Giao thành công"
        },
        {
            id: 'Bussiness3',
            date: '2023-11-26',
            items: [
                {
                    id: 1, name: 'Giày thể thao đá bóng', quantity: 2, price: 10, img: 'logo.png', size: "XL",
                    detail: "giày nam số một thị trường dành cho nhưng cầu thủ, sử dụng cho môi trường làm việc với công suất lớn "
                },
                {
                    id: 2, name: 'Giày thể thao đá bóng', quantity: 1, price: 20, img: 'logo.png', size: "XL",
                    detail: "giày nam số một thị trường dành cho nhưng cầu thủ, sử dụng cho môi trường làm việc với công suất lớn "
                },
                // Add more items
            ],
            total: 50,
            state: "Chưa thanh toán"
        },
        {
            id: 'Bussiness4',
            date: '2023-11-26',
            items: [
                {
                    id: 1, name: 'Giày thể thao đá bóng', quantity: 2, price: 10, img: 'logo.png', size: "XL",
                    detail: "giày nam số một thị trường dành cho nhưng cầu thủ, sử dụng cho môi trường làm việc với công suất lớn "
                },
                {
                    id: 2, name: 'Giày thể thao đá bóng', quantity: 1, price: 20, img: 'logo.png', size: "XL",
                    detail: "giày nam số một thị trường dành cho nhưng cầu thủ, sử dụng cho môi trường làm việc với công suất lớn "
                },
                // Add more items
            ],
            total: 50,
            state: "Đã hủy đơn"
        },
        {
            id: 'Bussiness4',
            date: '2023-11-26',
            items: [
                {
                    id: 1, name: 'Giày thể thao đá bóng', quantity: 2, price: 10, img: 'logo.png', size: "XL",
                    detail: "giày nam số một thị trường dành cho nhưng cầu thủ, sử dụng cho môi trường làm việc với công suất lớn "
                },
                {
                    id: 2, name: 'Giày thể thao đá bóng', quantity: 1, price: 20, img: 'logo.png', size: "XL",
                    detail: "giày nam số một thị trường dành cho nhưng cầu thủ, sử dụng cho môi trường làm việc với công suất lớn "
                },
                // Add more items
            ],
            total: 50,
            state: "Đã thanh toán"
        },
    ]);

    const filteredOrders = orderStatus === 'Tất cả' 
        ? orders 
        : orders.filter(order => order.state === orderStatus);

    return (
        <>
            <section className='shop'>
                <div className='d_flex'>
                    <MenuAdmin/>
                    <div className='contentWidth'>
                        <div className="menu">
                            <p className="menu-item" onClick={() => setOrderStatus('Tất cả')}>Tất cả</p>
                            <p className="menu-item" onClick={() => setOrderStatus('Đang giao hàng')}>Đang giao hàng</p>
                            <p className="menu-item" onClick={() => setOrderStatus('Giao thành công')}>Giao thành công</p>
                            <p className="menu-item" onClick={() => setOrderStatus('Chưa thanh toán')}>Chưa thanh toán</p>
                            <p className="menu-item" onClick={() => setOrderStatus('Đã thanh toán')}>Đã thanh toán</p>
                            <p className="menu-item" onClick={() => setOrderStatus('Đã hủy đơn')}>Đã hủy đơn</p>
                        </div>
                        <div>
                            <TrackAdmin orders={filteredOrders} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminTrack;

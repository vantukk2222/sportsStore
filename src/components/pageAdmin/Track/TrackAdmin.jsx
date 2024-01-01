import React from 'react';

const TrackAdmin = ({ orders }) => {
    return (
        <div className="order-list">
            {orders.map(order => (
                <div key={order.id} className="order-container">
                    <h3 className="order-header">Đơn hàng #{order.id}</h3>
                    <p className="date-text">Ngày mua: {order.date}</p>
                    <ul className="item-list">
                        {order.items.map(item => (
                            <li key={item.id} className="item">
                                {item.img && <img src={item.img} className="item-image" />}
                                <div className="item-details">
                                    <span>{item.name}</span>
                                    <span>Số lượng: {item.quantity}</span>
                                    <span>Mô tả: {item.detail}</span>
                                    <span>Size: {item.size}</span>
                                    <span>Giá tiền: ${item.price * item.quantity}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="total-state-container">
                        <p className="total-text">Tổng tiền: ${order.total}</p>
                        <p className="state-text">Trạng thái: {order.state}</p>
                        <button className="total-text">Xác nhận: Đã giao hàng</button>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default TrackAdmin;

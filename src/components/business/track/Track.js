import { useState } from 'react';

const Track = ({ orders }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleSell = (id) => {};

    return (
        <div className="order-list">
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order.id} className="order-container">
                        <h3 className="order-header">Đơn hàng #{order.id}</h3>
                        <p className="date-text">Ngày mua: {order.date}</p>
                        <ul className="item-list">
                            {order.items.map((item) => (
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
                            {order.state === 3 && (
                                <div className="actiontrack">
                                    <button onClick={() => handleSell(order.id)} className="action-button">
                                        Xác nhận
                                    </button>
                                    <button className="delete">Xóa</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div className="order-container">
                    <h2>Không có đơn hàng</h2>
                </div>
            )}
        </div>
    );
};

export default Track;

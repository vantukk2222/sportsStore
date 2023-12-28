import React, { useState } from 'react';

const Track = ({ orders }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);

    const toggleProductSelection = (orderId, productId) => {
        const isSelected = selectedProducts.some(item => item.orderId === orderId && item.productId === productId);

        if (isSelected) {
            setSelectedProducts(prevSelected => prevSelected.filter(item => !(item.orderId === orderId && item.productId === productId)));
        } else {
            setSelectedProducts(prevSelected => [...prevSelected, { orderId, productId }]);
        }
    };

    const handleConfirm = () => {
        console.log('Confirmed products:', selectedProducts);
    };

    const handleDelete = () => {
        console.log('Deleted products:', selectedProducts);
    };

    return (
        <div className="order-list">
            {orders.map(order => (
                <div key={order.id} className="order-container">
                    <h3 className="order-header">Đơn hàng #{order.id}</h3>
                    <p className="date-text">Ngày mua: {order.date}</p>
                    <ul className="item-list">
                        {order.items.map(item => (
                            <li key={item.id} className="item">
                            <input
  className="checkbox-track"
  type="checkbox"
  checked={selectedProducts.some(selectedItem => selectedItem.orderId === order.id && selectedItem.productId === item.id)}
  onChange={() => toggleProductSelection(order.id, item.id)}
/>
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
                        {order.state === 'Chờ xác nhận' && (
                            <div className='actiontrack'>
                                <button onClick={handleConfirm} className="action-button">Xác nhận</button>
                                <button onClick={handleDelete} className="delete">Xóa</button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Track;

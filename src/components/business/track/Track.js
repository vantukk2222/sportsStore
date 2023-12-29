import { useState } from 'react';

const Track = ({ orders }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleSell = (id) => {};
    const state = ['Đang giao hàng', 'Giao thành công', 'Chưa thanh toán', 'Chờ xác nhận', 'Đã hủy đơn'];
    return (
        <div className="order-list">
            {orders.length > 0 ? (
                orders?.map((order) => {
                    let date = new Date(order.updated_at);
                    date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                    return (
                        <div key={order.id} className="order-container">
                            <h3 className="order-header">Đơn hàng #{order.id}</h3>
                            <p className="date-text">Ngày mua: {date}</p>
                            <ul className="item-list">
                                {order.bill_detailSet?.map((item) => (
                                    <li key={item.id} className="item">
                                        {item.product.image_product_information && (
                                            <img src={item.product.image_product_information} className="item-image" />
                                        )}
                                        <div className="item-details">
                                            <h3>{item.product.name_product_information}</h3>
                                            <span>Số lượng: {item.quantity}</span>
                                            {/* <span>Mô tả: {item.detail}</span> */}
                                            <span>Size: {item.product.size}</span>
                                            <span>Giá tiền: {item.price}vnđ</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="total-state-container">
                                <p className="total-text">Tổng tiền: ${order.total}</p>
                                <p className="state-text">Trạng thái:{state[order.state]}</p>
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
                    );
                })
            ) : (
                <div className="order-container">
                    <h2>Không có đơn hàng</h2>
                </div>
            )}
        </div>
    );
};

export default Track;

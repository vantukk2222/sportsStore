// MyOrder.js
import React from 'react';
import Loading from '../loading/Loading';

const MyOrder = ({ orders }) => {
    console.log(orders);
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
                                            <span>{item.product.name_product_information}</span>
                                            <span>Số lượng: {item.quantity}</span>
                                            {/* <span>Mô tả: {item.detail}</span> */}
                                            <span>Size: {item.product.size}</span>
                                            <span>Giá tiền: ${item.price}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="total-state-container">
                                <p className="total-text">Tổng tiền: ${order.total}</p>
                                <p className="state-text">Trạng thái: {state[order.state]}</p>
                                {order.state == 0 && <button className="total-text">Xác nhận đã giao hàng</button>}
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

export default MyOrder;

// MyOrder.js

import { useState } from 'react';
import getUnAuth from '~/API/get';
import putConfirmReceive from '~/API/putConfirmReceive';

const MyOrder = ({ orders }) => {
    //console.log(orders);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleSm = (id) => {
     //   console.log(id);
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        putConfirmReceive(id, authToken);
    };
    const hanldeRePay = (id) => {
     //   console.log(id);
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getUnAuth(`bill/get_refresh_payment/${id}`);
           //     console.log(response);
                window.location.href = response;
                if (!response) {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    };
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
                                <p className="state-text">Trạng thái: {state[order.state]}</p>
                                {order.state === 0 && (
                                    <button className="total-text" onClick={() => handleSm(order.id)}>
                                        Xác nhận đã giao hàng
                                    </button>
                                )}
                                {/* {order.state === 1 && (
                                    <button className="total-text">Xác nhận giao hàng thành công</button>
                                )} */}
                                {order.state === 2 && (
                                    <button className="total-text" onClick={() => hanldeRePay(order.id)}>
                                        Thanh toán lại
                                    </button>
                                )}
                                {/* {order.state === 3 && <button className="total-text">Xác nhận đã thanh toán</button>} */}
                                {/* {order.state === 4 && <button className="total-text">Mua lại</button>} */}
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

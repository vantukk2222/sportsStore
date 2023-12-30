// MyOrder.js

import { useState } from 'react';
import getUnAuth from '~/API/get';
import putConfirmReceive from '~/API/putConfirmReceive';
import { useDispatch, useSelector } from 'react-redux';
import { listBillById } from '~/redux/reducers/Bill/listBillReducer';
import { useNavigate } from 'react-router';
const MyOrder = ({ orders }) => {
    console.log(orders);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('User'));
    const { dataBill, loadingBill, errorBill } = useSelector((state) => state.listBillReducer);
    const { dataRole, loadingRole, errorRole } = useSelector((state) => state.roleReducer);
    const navigate = useNavigate();
    const handleSm = (id) => {
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        putConfirmReceive(id, authToken)
            .then(dispatch(listBillById(user.id, dataRole)))
            .then(() => window.location.reload());
    };
    const hanldeRePay = (id) => {
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        const fetchData = async () => {
            try {
                setLoading(true);
                console.log(id);
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
    if (orders) {
        let i = 0;
        let t = 0;
        let result = orders.reduce((a, e) => {
            //   console.log(a);
            if (a.length > 0) {
                if (t === e.transaction.id && e.state == 2) {
                    a[i] = [...a[i], e];
                } else {
                    t = e.transaction.id;
                    i++;
                    a.push([e]);
                }
            } else {
                t = e.transaction.id;
                a.push([e]);
            }
            return a;
        }, []);
        orders = result;
    }
    const handleClick = (id) => {
        if (id) navigate(`/product/${id}`);
    };
    //  console.log(orders);
    const state = ['Đang giao hàng', 'Giao thành công', 'Chưa thanh toán', 'Chờ xác nhận', 'Đã hủy đơn'];
    return (
        <div className="order-list">
            {orders.length > 0 ? (
                orders?.map((orders) => {
                    let date = new Date(orders[0].updated_at);
                    date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                    console.log(orders);
                    return (
                        <div key={orders[0].id} className="order-container">
                            {orders.map((order) => (
                                <>
                                    <h3 className="order-header">{order.name}</h3>
                                    <p className="date-text">Ngày mua: {date}</p>
                                    <ul className="item-list">
                                        {order.bill_detailSet?.map((item) => (
                                            <li key={item.id} className="item">
                                                {item.product.image_product_information && (
                                                    <img
                                                        src={item.product.image_product_information}
                                                        className="item-image"
                                                        onClick={() => handleClick(item.product.id_product_information)}
                                                    />
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
                                </>
                            ))}
                            <div className="total-state-container">
                                <p className="total-text">Tổng tiền: ${orders.reduce((t, e) => t + e.total, 0)}</p>
                                <p className="state-text">Trạng thái: {state[orders[0].state]}</p>
                                {orders[0].state === 0 && (
                                    <button className="total-text" onClick={() => handleSm(orders[0].id)}>
                                        Xác nhận đã giao hàng
                                    </button>
                                )}
                                {orders[0].state === 2 && (
                                    <button
                                        className="total-text"
                                        onClick={() => hanldeRePay(orders[0].transaction.id)}
                                    >
                                        Thanh toán lại
                                    </button>
                                )}
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

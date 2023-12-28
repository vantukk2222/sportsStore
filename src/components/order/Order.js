import { useEffect, useState } from 'react';
import MenuProfile from '../menuprofile/MenuProfile';
import MyOrder from './MyOrder';
import './Order.css';
import getUnAuth from '~/API/get';

const Order = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderstate, setOrderstate] = useState(5);
    const [orders, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem('User'));
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getUnAuth(`bill/get-by-id-user/${user.id}`);
                //   console.log(response);
                setOrders(response);
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
    }, []);
    const filteredOrders = orderstate === 5 ? orders : orders.filter((order) => order.state === orderstate);
    //   console.log(filteredOrders);
    return (
        <>
            <section className="shop background">
                <div className="container d_flex">
                    <MenuProfile />
                    <div className="contentWidth">
                        <div className="menu">
                            <p className="menu-item" onClick={() => setOrderstate(5)}>
                                Tất cả
                            </p>
                            <p className="menu-item" onClick={() => setOrderstate(0)}>
                                Đang giao hàng
                            </p>
                            <p className="menu-item" onClick={() => setOrderstate(1)}>
                                Giao thành công
                            </p>
                            <p className="menu-item" onClick={() => setOrderstate(2)}>
                                Chưa thanh toán
                            </p>
                            <p className="menu-item" onClick={() => setOrderstate(3)}>
                                Chờ xác nhận
                            </p>
                            <p className="menu-item" onClick={() => setOrderstate(4)}>
                                Đã hủy đơn
                            </p>
                        </div>
                        <div>
                            <MyOrder orders={filteredOrders} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Order;

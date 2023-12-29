import { useEffect, useState } from 'react';
import MenuBusiness from '../MenuBusiness';
import Track from './Track';
import getUnAuth from '~/API/get';

const BusinessTrack = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderstate, setOrderstate] = useState(5);
    const [orders, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem('User'));
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // if (user.id) {
                console.log(user.id);
                const response = await getUnAuth(`bill/get-by-business/${user.id}`);
                console.log(response);
                setOrders(response.content);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                // }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const filteredOrders = orderstate === 5 ? orders : orders.filter((order) => order.state === orderstate);
    return (
        <>
            <section className="shop background">
                <div className="d_flex">
                    <MenuBusiness />
                    <div className="contentWidth">
                        <div className="menu">
                            <p className="menu-item" onClick={() => setOrderstate(5)}>
                                Tất cả
                            </p>
                            <p className="menu-item" onClick={() => setOrderstate(3)}>
                                Chờ xác nhận
                            </p>
                            <p className="menu-item" onClick={() => setOrderstate(0)}>
                                Đang giao hàng
                            </p>
                            <p className="menu-item" onClick={() => setOrderstate(1)}>
                                Giao thành công
                            </p>
                            <p className="menu-item" onClick={() => setOrderstate(4)}>
                                Đã hủy đơn
                            </p>
                        </div>
                        <div>
                            <Track orders={filteredOrders} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BusinessTrack;

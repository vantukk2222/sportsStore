import { useEffect, useState, useRef } from 'react';
import MenuProfile from '../menuprofile/MenuProfile';
import MyOrder from './MyOrder';
import './Order.css';
import { useDispatch, useSelector } from 'react-redux';
import { listBillById } from '~/redux/reducers/Bill/listBillReducer';
import { useLocation } from 'react-router';

const Order = () => {
    const [orderstate, setOrderstate] = useState(5);
    const user = JSON.parse(localStorage.getItem('User'));
    const location = useLocation();
    const dispatch = useDispatch();
    const { dataBill, loadingBill, errorBill } = useSelector((state) => state.listBillReducer);
    const { dataRole, loadingRole, errorRole } = useSelector((state) => state.roleReducer);
    const [filteredOrders, setFilteredOrders] = useState([]);
    //const filteredOrders = orderstate === 5 ? dataBill : dataBill.filter((order) => order.state === orderstate);
    useEffect(() => {
        const id = parseInt(location.pathname.slice(location.pathname.lastIndexOf('/') + 1));
        dispatch(listBillById(user.id, dataRole)).then(setOrderstate(id));
        // console.log(dataBill, orderstate);
        setFilteredOrders(orderstate === 5 ? dataBill : dataBill.filter((order) => order.state === orderstate));
    }, []);
    useEffect(() => {
        setFilteredOrders(orderstate === 5 ? dataBill : dataBill.filter((order) => order.state === orderstate));
    }, [orderstate]);
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
                            <MyOrder orders={filteredOrders} orderstate={orderstate} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Order;

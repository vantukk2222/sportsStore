import { useEffect, useState, useRef } from 'react';
import MenuProfile from '../menuprofile/MenuProfile';
import MyOrder from './MyOrder';
import './Order.css';
import { useDispatch, useSelector } from 'react-redux';
import { listBillById } from '~/redux/reducers/Bill/listBillReducer';

const Order = () => {
    const [orderstate, setOrderstate] = useState(() => {
        const state = JSON.parse(localStorage.getItem('State'));
        return state;
    });
    const user = JSON.parse(localStorage.getItem('User'));
    const dispatch = useDispatch();
    const { dataBill, loadingBill, errorBill } = useSelector((state) => state.listBillReducer);
    const { dataRole, loadingRole, errorRole } = useSelector((state) => state.roleReducer);
    useEffect(() => {
        dispatch(listBillById(user.id, dataRole));
    }, []);
    // console.log(orderstate, dataBill);
    const filteredOrders = orderstate === 5 ? dataBill : dataBill.filter((order) => order.state === orderstate);
    //  console.log(filteredOrders);
    localStorage.setItem('State', JSON.stringify(orderstate));
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

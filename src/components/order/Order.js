import { useEffect, useState, useRef } from 'react';
import MenuProfile from '../menuprofile/MenuProfile';
import MyOrder from './MyOrder';
import './Order.css';
import { useDispatch, useSelector } from 'react-redux';
import { listBillById } from '~/redux/reducers/Bill/listBillReducer';
import Pagination from '../Shop/Pagination';

const Order = () => {
    const [orderstate, setOrderstate] = useState(() => {
        const state = JSON.parse(localStorage.getItem('State'));
        return state;
    });
    const user = JSON.parse(localStorage.getItem('User'));
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const { dataBill, loadingBill, errorBill } = useSelector((state) => state.listBillReducer);
    const { dataRole, loadingRole, errorRole } = useSelector((state) => state.roleReducer);
    useEffect(() => {
        dispatch(listBillById(user.id, dataRole));
    }, []);
    function isInteger(value) {
        return typeof value === 'number' && isFinite(value) && (value | 0) === value;
    }
    let filteredOrders = orderstate === 5 ? dataBill : dataBill.filter((order) => order.state === orderstate);
    let totalPages = isInteger(filteredOrders.length / 10)
        ? parseInt(filteredOrders.length / 10)
        : parseInt(filteredOrders.length / 10) + 1;

    let arr = [];

    let t = filteredOrders.reduce((a, e) => {
        if (a.length == 10) {
            arr.push(a);
            a = [];
            a.push(e);
        } else a.push(e);
        return a;
    }, []);
    arr.push(t);
    localStorage.setItem('State', JSON.stringify(orderstate));
    return (
        <>
            <section className="shop background">
                <div className="container d_flex">
                    <MenuProfile />
                    <div className="contentWidth">
                        <div className="menu">
                            <p
                                className="menu-item"
                                onClick={() => {
                                    setPage(0);
                                    setOrderstate(5);
                                }}
                            >
                                Tất cả
                            </p>
                            <p
                                className="menu-item"
                                onClick={() => {
                                    setPage(0);
                                    setOrderstate(0);
                                }}
                            >
                                Đang giao hàng
                            </p>
                            <p
                                className="menu-item"
                                onClick={() => {
                                    setPage(0);
                                    setOrderstate(1);
                                }}
                            >
                                Giao thành công
                            </p>
                            <p
                                className="menu-item"
                                onClick={() => {
                                    setPage(0);
                                    setOrderstate(2);
                                }}
                            >
                                Chưa thanh toán
                            </p>
                            <p
                                className="menu-item"
                                onClick={() => {
                                    setPage(0);
                                    setOrderstate(3);
                                }}
                            >
                                Chờ xác nhận
                            </p>
                            <p
                                className="menu-item"
                                onClick={() => {
                                    setPage(0);
                                    setOrderstate(4);
                                }}
                            >
                                Đã hủy đơn
                            </p>
                        </div>
                        <div>
                            <MyOrder orders={arr[page]} orderstate={orderstate} />
                            {totalPages > 1 && (
                                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Order;

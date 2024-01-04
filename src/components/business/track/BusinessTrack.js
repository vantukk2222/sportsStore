import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listBillById } from '~/redux/reducers/Bill/listBillReducer';
import MenuBusiness from '../MenuBusiness';
import Track from './Track';
import Pagination from '~/components/Shop/Pagination';
const BusinessTrack = () => {
    const [orderstate, setOrderstate] = useState(() => {
        const state = JSON.parse(localStorage.getItem('State'));
        return state;
    });
    const user = JSON.parse(localStorage.getItem('User'));
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPage] = useState(0);
    const { dataBill, loadingBill, errorBill } = useSelector((state) => state.listBillReducer);
    const { dataRole, loadingRole, errorRole } = useSelector((state) => state.roleReducer);
    useEffect(() => {
        dispatch(listBillById(user.id, dataRole, page)).then(() =>
            setTotalPage(JSON.parse(localStorage.getItem('TotalPages'))),
        );
    }, [page, orderstate]);
    // const filteredOrders = orderstate === 5 ? dataBill : dataBill.filter((order) => order.state === orderstate);
    localStorage.setItem('State', JSON.stringify(orderstate));
    return (
        <>
            <section className="shop background">
                <div className="d_flex">
                    <MenuBusiness />
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
                                    setOrderstate(3);
                                }}
                            >
                                Chờ xác nhận
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
                                    setOrderstate(4);
                                }}
                            >
                                Đã hủy đơn
                            </p>
                        </div>
                        <div>
                            <Track orders={dataBill} />
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

export default BusinessTrack;

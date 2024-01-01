import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listBillById } from '~/redux/reducers/Bill/listBillReducer';
import MenuBusiness from '../MenuBusiness';
import Track from './Track';
const BusinessTrack = () => {
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
        console.log(dataBill);
    }, []);
    const filteredOrders = orderstate === 5 ? dataBill : dataBill.filter((order) => order.state === orderstate);
    localStorage.setItem('State', JSON.stringify(orderstate));
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

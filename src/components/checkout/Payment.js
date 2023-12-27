import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import postMomo from '~/API/postMomo';
import { listCartByIdUser } from '~/redux/reducers/Cart/listCartReducer';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};
const Payment = ({ selectedItems }) => {
    const check = JSON.parse(localStorage.getItem('selectedItems'));
    const navigate = useNavigate();
    if (!check) navigate('/');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const total = formatCurrency(
        selectedItems.reduce(
            (total, item) =>
                total +
                (item.product.sale
                    ? ((item.product.price * (100 - item.product.sale?.discount)) / 100) * item.quantity
                    : item.product.price * item.quantity),
            0,
        ),
    );
    const handlePayment = () => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const list_id = [];
                selectedItems.forEach((e) => list_id.push(e.id));
                const authToken = JSON.parse(localStorage.getItem('authToken'));
                // console.log(list_id);
                const response = await postMomo(list_id, 'captureWallet', authToken).then((res) => {
                    // console.log(res);
                    const user = JSON.parse(localStorage.getItem('User'));
                    // console.log(user.id);
                    dispatch(listCartByIdUser(user.id));
                    return res;
                });
                localStorage.removeItem('selectedItems');
                //   console.log('check response', response);
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
    return (
        <div className="payment">
            <div className="boxpayment">
                <div className="paymentbox">
                    <p>Tổng tiền: {total || 'N/A'}</p>
                    {/* <p>Giảm giá</p> */}
                    <p>Tổng thanh toán: {total || 'N/A'}</p>
                </div>
            </div>
            <div className="paymentbutton">
                <button onClick={handlePayment}>ĐẶT HÀNG</button>
            </div>
        </div>
    );
};

export default Payment;

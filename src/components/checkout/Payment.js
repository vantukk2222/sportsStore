import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import postMomo from '~/API/postMomo';
import { listCartByIdUser } from '~/redux/reducers/Cart/listCartReducer';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount).replace('₫', 'vnđ');
};
const Payment = ({ selectedItems }) => {
    const check = JSON.parse(localStorage.getItem('selectedItems'));
    const navigate = useNavigate();
    const [shippingProvider, setShippingProvider] = useState('');
    if (!check) navigate('/');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const total = formatCurrency(
        selectedItems.reduce((total, item) => {
            let givenTimeStr = item.product.sale?.ended_at || null;
            if (givenTimeStr) {
                const givenTime = new Date(givenTimeStr);
                const currentTime = new Date();
                if (givenTime > currentTime) givenTimeStr = true;
                else givenTimeStr = false;
            } else givenTimeStr = false;
            return (
                total +
                (givenTimeStr
                    ? ((item.product.price * (100 - item.product.sale?.discount)) / 100) * item.quantity
                    : item.product.price * item.quantity)
            );
        }, 0),
    );
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'shippingProvider') {
            setShippingProvider(value);
        }
    };
    const handlePayment = () => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const list_id = [];
                selectedItems.forEach((e) => list_id.push(e.id));
                const authToken = JSON.parse(localStorage.getItem('authToken'));

                const response = await postMomo(list_id, shippingProvider, authToken).then((res) => {
                    const user = JSON.parse(localStorage.getItem('User'));

                    dispatch(listCartByIdUser(user.id));
                    return res;
                });
                localStorage.removeItem('selectedItems');
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
        if (shippingProvider) fetchData();
        else alert('Hãy chọn phương thức thanh toán');
    };
    return (
        <div className="payment">
            <div className="boxpayment">
                <div className="paymentbox">
                    <p>Tổng tiền: {total || 'N/A'}</p>
                    {/* <p>Giảm giá</p> */}
                    <p>Tổng thanh toán: {total || 'N/A'}</p>
                    <div className="ship-listcheckout">
                        {/* <p>Lời nhắn</p>
                        <input type="text" name="message" value={message} onChange={handleInputChange} /> */}
                        <select name="shippingProvider" value={shippingProvider} onChange={handleInputChange}>
                            <option value="">Phương thức thanh toán</option>
                            <option value="payWithATM">thanh toán bằng ATM</option>
                            <option value="captureWallet">thanh toán bằng Momo</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="paymentbutton">
                <button onClick={handlePayment}>ĐẶT HÀNG</button>
            </div>
        </div>
    );
};

export default Payment;

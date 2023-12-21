import React from 'react';
import axios from 'axios';

const Payment = () => {
    const handleMoMoPayment = async () => {
        try {
            // Gọi API MoMo để tạo đơn hàng
            const response = await axios.post('YOUR_MOMO_API_ENDPOINT', {
                partnerCode: 'YOUR_PARTNER_CODE',
                accessKey: 'YOUR_ACCESS_KEY',
                requestId: 'YOUR_REQUEST_ID',
                amount: 10000, // Số tiền thanh toán
                orderId: 'YOUR_ORDER_ID',
                orderInfo: 'Thanh toán qua MoMo',
                returnUrl: 'YOUR_RETURN_URL',
                notifyUrl: 'YOUR_NOTIFY_URL',
            });

            // Redirect người dùng đến trang thanh toán MoMo
            window.location.href = response.data.payUrl;
        } catch (error) {
            console.error('MoMo payment error:', error);
        }
    };

    return (
        <div className="payment">
            <div className="lispayment">
                <h2>Thanh toán bằng MoMo</h2>
            </div>
            <div className="boxpayment">
                <div className="paymentbox">
                    <p>Tổng tiền</p>
                    <p>Phí vận chuyển</p>
                    <p>Giảm giá</p>
                    <p>Tổng thanh toán</p>
                </div>
            </div>
            <div className="paymentbutton">
                <button onClick={handleMoMoPayment}>ĐẶT HÀNG</button>
            </div>
        </div>
    );
};

export default Payment;

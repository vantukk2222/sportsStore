import React from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutAd from './CheckoutAd';
import ListCheckout from './ListCheckout';
import Payment from './Payment';
import './Checkout.css';

const Checkout = () => {
    const location = useLocation();
    const selectedItems = location.state?.selectedItems || [];

    return (
        <div className="checkout">
            <div className="addresscheckout">
                <CheckoutAd selectedItems={selectedItems} />
            </div>
            <div className="listcheckout">
                <ListCheckout selectedItems={selectedItems} />
            </div>
            <div className="payment">
                <Payment selectedItems={selectedItems} />
            </div>
        </div>
    );
};

export default Checkout;

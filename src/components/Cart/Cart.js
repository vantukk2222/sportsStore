import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
const Cart = () => {
    return (
        <>
            <section className="cart-items">
                <div className="container d_flex">
                    <div className="cart-details"></div>

                    <div className="cart-total product">
                        <h2>Thanh toán giỏ hàng</h2>
                        <div className=" d_flex">
                            <h4>Tổng tiền :</h4>
                            <h3>$.00</h3>
                            <Link to="/checkout" className="payButton">
                                Thanh toán
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cart;

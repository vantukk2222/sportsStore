import React, { useLayoutEffect } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
const Cart = () => {
    const navigate = useNavigate();
    const store = JSON.parse(localStorage.getItem('authToken'));
    useLayoutEffect(() => {
        if (!store) navigate('/login', { replace: true });
    }, []);
    const cart = JSON.parse(localStorage.getItem('Cart'));
    //console.log(cart);
    const handleClick = (id) => {
        if (id) navigate(`/product/${id}`);
    };
    const totalPrice = cart?.reduce((price, item) => price + item.quantity * item.product.price, 0);
    return (
        <>
            <section className="cart-items">
                <div className="container d_flex">
                    <div className="cart-details">
                        {cart?.length === 0 ? (
                            <h1 className="no-items product">Không có sản phẩm trong giỏ hàng</h1>
                        ) : (
                            cart?.map((item) => {
                                const productQty = item.product.price * item.quantity;

                                return (
                                    <div className="cart-list product d_flex" key={item.id}>
                                        <div className="img">
                                            <img
                                                src={item.product.image_product_information}
                                                alt=""
                                                onClick={() => handleClick(item.product.id_product_information)}
                                            />
                                        </div>

                                        <div className="cart-details">
                                            <h3>{item.product.name_product_information}</h3>
                                            <h4> Phân loại hàng: {item.product.size}</h4>
                                            <h4>
                                                {item.product.price} Vnđ x {item.quantity}
                                                <span>Thành tiền: {productQty} Vnđ</span>
                                            </h4>
                                        </div>
                                        <div className="cart-items-function">
                                            <div className="removeCart">
                                                <button className="removeCart">
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>

                                            <div className="cartControl d_flex">
                                                <button className="incCart">
                                                    <i className="fa-solid fa-plus"></i>
                                                </button>
                                                <button className="desCart">
                                                    <i className="fa-solid fa-minus"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="cart-item-price"></div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="cart-total product">
                        <h2>Thanh toán giỏ hàng</h2>
                        <div className=" d_flex">
                            <h4>Tổng tiền :</h4>
                            <h3>{totalPrice} Vnđ</h3>
                        </div>
                        {cart?.length > 0 && (
                            <button className="payButton">
                                <Link to="/checkout">Thanh toán</Link>
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cart;

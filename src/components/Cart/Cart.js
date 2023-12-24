// Cart.js

import React, { useState, useLayoutEffect, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { listCartByIdUser } from '~/redux/reducers/Cart/listCartReducer';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../loading/Loading';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const store = JSON.parse(localStorage.getItem('authToken'));
    const [checkedItems, setCheckedItems] = useState([]);
    const [selectedShops, setSelectedShops] = useState([]);
    const [check, setCheck] = useState(false);
    const { dataCart, loadingCart, errorCart } = useSelector((state) => state.listCartReducer);
    const totalPrice = dataCart?.reduce(
        (price, item) => (checkedItems.includes(item.id) ? price + item.quantity * item.product.price : price),
        0,
    );

    const toggleCheckbox = (id, businessName) => {
        setCheckedItems((prevItems) => {
            if (id === 'shop') {
                return selectedShops.includes(businessName)
                    ? prevItems.filter(
                          (item) =>
                              !dataCart
                                  .filter((item) => item.business.name === businessName)
                                  .map((item) => item.id)
                                  .includes(item),
                      )
                    : [
                          ...prevItems,
                          ...dataCart.filter((item) => item.business.name === businessName).map((item) => item.id),
                      ];
            } else if (prevItems.includes(id)) {
                return prevItems.filter((item) => item !== id);
            } else {
                return [...prevItems, id];
            }
        });
    };

    const handleShopCheckbox = (businessName) => {
        const existingShops = [...selectedShops];
        if (existingShops.includes(businessName)) {
            const index = existingShops.indexOf(businessName);
            existingShops.splice(index, 1);
        } else {
            existingShops.push(businessName);
        }

        setSelectedShops(existingShops);
        setCheckedItems((prevItems) => {
            return existingShops.includes(businessName)
                ? [
                      ...prevItems,
                      ...dataCart.filter((item) => item.business.name === businessName).map((item) => item.id),
                  ]
                : prevItems.filter(
                      (item) =>
                          !dataCart
                              .filter((item) => item.business.name === businessName)
                              .map((item) => item.id)
                              .includes(item),
                  );
        });
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('User'));
        dispatch(listCartByIdUser(user.id)).then(() => {
            setCheck(true);
        });
    }, []);

    useLayoutEffect(() => {
        if (!store) navigate('/login', { replace: true });
    }, []);

    const handleClick = (id) => {
        if (id) navigate(`/product/${id}`);
    };

    const handleAdd = (product) => {
        // Add your logic for adding products to the cart here
    };

    const handleCheckout = () => {
        const selectedItems = dataCart.filter((item) => checkedItems.includes(item.id));
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        navigate('/checkout', { state: { selectedItems: selectedItems } });
    };

    return (
        <>
            {check ? (
                <section className="cart-items">
                    <div className="container d_flex">
                        <div className="cart-details">
                            {dataCart?.length === 0 ? (
                                <h1 className="no-items product">Không có sản phẩm trong giỏ hàng</h1>
                            ) : (
                                <div>
                                    {dataCart?.map((item, index) => {
                                        const productQty = item.product.price * item.quantity;

                                        const isNewBusiness =
                                            index === 0 || item.business.name !== dataCart[index - 1].business.name;

                                        return (
                                            <div
                                                className={`cart-item ${isNewBusiness ? 'new-business' : ''}`}
                                                key={item.id}
                                            >
                                                {isNewBusiness && (
                                                    <div className="businesscontainer">
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedShops.includes(item.business.name)}
                                                                onChange={() => handleShopCheckbox(item.business.name)}
                                                            />
                                                            <h3>{item.business.name}</h3>
                                                        </label>
                                                    </div>
                                                )}
                                                <div className="cart-list product d_flex" key={item.id}>
                                                    <div className="checkbox-container">
                                                        <input
                                                            type="checkbox"
                                                            id={`checkbox-${item.id}`}
                                                            checked={checkedItems.includes(item.id)}
                                                            onChange={() => toggleCheckbox(item.id, item.business.name)}
                                                        />
                                                    </div>
                                                    <div className="img">
                                                        <img
                                                            src={item.product.image_product_information}
                                                            alt=""
                                                            onClick={() =>
                                                                handleClick(item.product.id_product_information)
                                                            }
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
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="cart-total product">
                            <h2>Thanh toán giỏ hàng</h2>
                            <div className=" d_flex">
                                <h4>Tổng tiền :</h4>
                                <h3>{totalPrice} Vnđ</h3>
                            </div>
                            {dataCart?.length > 0 && (
                                <button className="payButton" onClick={handleCheckout}>
                                    THANH TOÁN
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Cart;

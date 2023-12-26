import React, { useState, useLayoutEffect, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { listCartByIdUser } from '~/redux/reducers/Cart/listCartReducer';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../loading/Loading';
import getUnAuth from '~/API/get';
import putCart from '~/API/putCart';
import deleteCart from '~/API/deleteCart';
import Modal from 'react-modal';
Modal.setAppElement('#root');
const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const store = JSON.parse(localStorage.getItem('authToken'));
    const [checkedItems, setCheckedItems] = useState([]);
    const [selectedShops, setSelectedShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [check, setCheck] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleAdd = (item) => {
        console.log(item);
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await getUnAuth(`product/${item.product.id}`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                if (response.quantity > item.quantity)
                    putCart(item.id, item.quantity + 1, authToken).then(() => dispatch(listCartByIdUser(item.user.id)));
                else {
                    putCart(item.id, response.quantity, authToken).then(() => dispatch(listCartByIdUser(item.user.id)));
                    alert('Loại bạn muốn mua đã tối đa');
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    };
    const handleConfirmation = () => {
        const item = JSON.parse(localStorage.getItem('Item'));
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await deleteCart(item.id, authToken).then(() =>
                    dispatch(listCartByIdUser(item.user.id)),
                );
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
        closeModal();
    };
    const handleRemove = (item) => {
        console.log(item);
        localStorage.setItem('Item', JSON.stringify(item));
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        localStorage.removeItem('Item');
    };
    const handleMinus = (item) => {
        console.log(item);
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await getUnAuth(`product/${item.product.id}`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                if (response.quantity > item.quantity)
                    putCart(item.id, item.quantity - 1, authToken).then(() => dispatch(listCartByIdUser(item.user.id)));
                else {
                    putCart(item.id, response.quantity, authToken).then(() => dispatch(listCartByIdUser(item.user.id)));
                    alert('Loại bạn muốn mua đã tối đa');
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        if (item.quantity > 1) fetchData();
        else handleRemove(item);
    };
    const handleCheckout = () => {
        const selectedItems = dataCart.filter((item) => checkedItems.includes(item.id));
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        navigate('/checkout', { state: { selectedItems: selectedItems } });
    };

    return (
        <>
            {check ? (
                <>
                    <Modal
                        className="modalcart"
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        contentLabel="Xác nhận"
                    >
                        <h2>Xác nhận</h2>
                        <p>Bạn có chắc chắn muốn tiếp tục?</p>
                        <button onClick={handleConfirmation}>Có</button>
                        <button onClick={closeModal}>Không</button>
                    </Modal>
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
                                                                    onChange={() =>
                                                                        handleShopCheckbox(item.business.name)
                                                                    }
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
                                                                onChange={() =>
                                                                    toggleCheckbox(item.id, item.business.name)
                                                                }
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
                                                                <button
                                                                    className="removeCart"
                                                                    onClick={() => handleRemove(item)}
                                                                >
                                                                    <i className="fa-solid fa-xmark"></i>
                                                                </button>
                                                            </div>
                                                            <div className="cartControl d_flex">
                                                                <button
                                                                    className="incCart"
                                                                    onClick={() => handleAdd(item)}
                                                                >
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </button>
                                                                <button
                                                                    className="desCart"
                                                                    onClick={() => handleMinus(item)}
                                                                >
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
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Cart;

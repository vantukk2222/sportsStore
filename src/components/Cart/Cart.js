import { useEffect, useLayoutEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import deleteCart from '~/API/deleteCart';
import getUnAuth from '~/API/get';
import putCart from '~/API/putCart';
import { listCartByIdUser } from '~/redux/reducers/Cart/listCartReducer';
import Loading from '../loading/Loading';
import './style.css';
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
        (price, item) => {
            if (checkedItems.includes(item.id)) {
                let givenTimeStr = item.product.sale?.ended_at || null;
                if (givenTimeStr) {
                    const givenTime = new Date(givenTimeStr);
                    const currentTime = new Date();
                    if (givenTime > currentTime) givenTimeStr = true;
                    else givenTimeStr = false;
                } else givenTimeStr = false;

                return (
                    price +
                    (givenTimeStr
                        ? ((item.product.price * (100 - item.product.sale?.discount)) / 100) * item.quantity
                        : item.product.price * item.quantity)
                );
            } else return price;
        },

        0,
    );

    const areAllItemsChecked = (businessName) => {
        const businessItems = dataCart.filter((item) => item.business.name === businessName);
        return businessItems.every((item) => checkedItems.includes(item.id));
    };

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
            const businessItems = dataCart.filter((item) => item.business.name === businessName);

            return existingShops.includes(businessName)
                ? [...prevItems, ...businessItems.map((item) => item.id)]
                : prevItems.filter((item) => !businessItems.map((item) => item.id).includes(item));
        });
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('User'));
        dispatch(listCartByIdUser(user?.id)).then(() => {
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
        localStorage.setItem('Item', JSON.stringify(item));
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        localStorage.removeItem('Item');
    };
    const handleMinus = (item) => {
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
    const handleDeleteSelected = () => {
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        const selectedItems = dataCart.filter((item) => checkedItems.includes(item.id));

        Promise.all(selectedItems.map((item) => deleteCart(item.id, authToken)))
            .then(() => {
                dispatch(listCartByIdUser(selectedItems[0].user.id));
                setCheckedItems([]);
            })
            .catch((error) => {
                setError(error);
            });
    };
    const sortDataCartByBusiness = (cartItems) => {
        return cartItems.slice().sort((a, b) => {
            const nameA = a.business.name.toUpperCase();
            const nameB = b.business.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    };
    const sortedDataCart = sortDataCartByBusiness(dataCart);

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
                                {sortedDataCart?.length === 0 ? (
                                    <h1 className="no-items product">Không có sản phẩm trong giỏ hàng</h1>
                                ) : (
                                    <div>
                                        {sortedDataCart?.map((item, index) => {
                                            const isNewBusiness =
                                                index === 0 ||
                                                item.business.name !== sortedDataCart[index - 1].business.name;
                                            let givenTimeStr = item.product.sale?.ended_at || null;
                                            if (givenTimeStr) {
                                                const givenTime = new Date(givenTimeStr);
                                                const currentTime = new Date();
                                                if (givenTime > currentTime) givenTimeStr = true;
                                                else givenTimeStr = false;
                                            } else givenTimeStr = false;
                                         
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
                                                                    checked={areAllItemsChecked(item.business.name)}
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
                                                                {givenTimeStr && (
                                                                    <span className="crossedNumber">
                                                                        {item.product.price}đ
                                                                    </span>
                                                                )}

                                                                {
                                                                    <span>
                                                                        {givenTimeStr
                                                                            ? (item.product.price *
                                                                                  (100 - item.product.sale?.discount)) /
                                                                              100
                                                                            : item.product.price}
                                                                        vnđ
                                                                    </span>
                                                                }
                                                                <span>x {item.quantity} </span>
                                                                <span>
                                                                    Thành tiền:
                                                                    {givenTimeStr
                                                                        ? ((item.product.price *
                                                                              (100 - item.product.sale?.discount)) /
                                                                              100) *
                                                                          item.quantity
                                                                        : item.product.price * item.quantity}
                                                                    vnđ
                                                                </span>
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
                                {checkedItems.length > 0 && (
                                    <>
                                        <div className="buttoncart">
                                            <button className="payButton" onClick={handleCheckout}>
                                                THANH TOÁN
                                            </button>
                                            {checkedItems.length > 0 && (
                                                <button className="deletecart" onClick={handleDeleteSelected}>
                                                    Xóa Đã Chọn
                                                </button>
                                            )}
                                        </div>
                                    </>
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

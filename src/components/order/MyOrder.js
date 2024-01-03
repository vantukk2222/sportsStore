import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import getUnAuth from '~/API/get';
import postCart from '~/API/postCart';
import { postComment } from '~/API/postComment';
import postImage from '~/API/postImage';
import putCart from '~/API/putCart';
import putConfirmReceive from '~/API/putConfirmReceive';
import { listBillById } from '~/redux/reducers/Bill/listBillReducer';
import { listCartByIdUser } from '~/redux/reducers/Cart/listCartReducer';
import RatingModal from './RatingModal';
const MyOrder = ({ orders }) => {
    //   console.log(orders);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('User'));
    const { dataCart, loadingCart, errorCart } = useSelector((state) => state.listCartReducer);
    const { dataRole, loadingRole, errorRole } = useSelector((state) => state.roleReducer);
    const navigate = useNavigate();
    const handleSm = (id) => {
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        putConfirmReceive(id, authToken)
            .then(dispatch(listBillById(user.id, dataRole)))
            .then(() => window.location.reload());
    };

    const [isRatingModalOpen, setRatingModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [rating, setRating] = useState(0);

    const openRatingModal = (order) => {
        setSelectedOrder(order);
        setRatingModalOpen(true);
    };

    const closeRatingModal = () => {
        setSelectedOrder(null);
        setRating(0);
        setRatingModalOpen(false);
    };
    const handleReBuy = (order) => {
        console.log(order);
        order.bill_detailSet.forEach((bill) => {
            const id2 = bill.product.id;
            const id_product_information = bill.product.id_product_information;
            const check = dataCart?.find(
                (c) => c?.product.id == id2 && c?.product.id_product_information == id_product_information,
            );
            if (check) {
                const user = JSON.parse(localStorage.getItem('User'));
                const id = check.id;
                const quantity = check.quantity;
                const authToken = JSON.parse(localStorage.getItem('authToken'));
                const fetchData = async () => {
                    try {
                        setLoading(true);
                        const response = await getUnAuth(`product/${id2}`);
                        if (!response) {
                            throw new Error('Network response was not ok');
                        }
                        if (response.quantity > quantity)
                            putCart(id, quantity + 1, authToken).then(() => dispatch(listCartByIdUser(user.id)));
                        else {
                            putCart(id, response.quantity, authToken).then(() => dispatch(listCartByIdUser(user.id)));
                            alert('Loại bạn muốn mua đã tối đa');
                        }
                    } catch (error) {
                        setError(error);
                    } finally {
                        setLoading(false);
                    }
                };
                fetchData();
            } else {
                const user = JSON.parse(localStorage.getItem('User'));
                const authToken = JSON.parse(localStorage.getItem('authToken'));
                postCart(user.id, id2, 1, authToken).then(() => dispatch(listCartByIdUser(user.id)));
            }
        });
    };
    const submitRating = (newProduct) => {
        // console.log(newProduct);
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        const t = () => {
            // Create an array to hold all the promises
            const promises = [];
            newProduct.id_imageSet.forEach((e) => {
                if (e.id == null) {
                    console.log(e.id);
                    const promise = postImage(newProduct.name, e.url, 'false', authToken)
                        .then((response) => (e.id = response.data))
                        .catch((error) => console.error('Error uploading image:', error));
                    promises.push(promise);
                }
            });
            newProduct.id_product_information = selectedOrder.bill_detailSet[0].product.id_product_information;
            newProduct.id_user = selectedOrder.id_user;
            newProduct.id_bill = selectedOrder.id;
            return Promise.all(promises);
        };
        t()
            .then(() => postComment(newProduct, authToken))
            .then(() => window.location.reload());
    };
    const hanldeRePay = (id) => {
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        const fetchData = async () => {
            try {
                setLoading(true);
                console.log(id);
                const response = await getUnAuth(`bill/get_refresh_payment/${id}`);
                //     console.log(response);
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
    if (orders) {
        let i = 0;
        let t = 0;
        let result = orders.reduce((a, e) => {
            //   console.log(a);
            if (a.length > 0) {
                if (t === e.transaction.id && e.state == 2) {
                    a[i] = [...a[i], e];
                } else {
                    t = e.transaction.id;
                    i++;
                    a.push([e]);
                }
            } else {
                t = e.transaction.id;
                a.push([e]);
            }
            return a;
        }, []);
        orders = result;
    }
    const handleClick = (id) => {
        if (id) navigate(`/product/${id}`);
    };
    const handleReDelete = (order) => {
        console.log(order);
    };
    //  console.log(orders);
    const state = ['Đang giao hàng', 'Giao thành công', 'Chưa thanh toán', 'Chờ xác nhận', 'Đã hủy đơn'];
    return (
        <div className="order-list">
            {orders.length > 0 ? (
                orders?.map((orders) => {
                    let date = new Date(orders[0].updated_at);
                    date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                    //console.log(orders);
                    return (
                        <div key={orders[0].id} className="order-container">
                            {orders.map((order) => (
                                <div key={order.id}>
                                    <h3 className="order-header">{order.name}</h3>
                                    <p className="date-text">Ngày mua: {date}</p>
                                    <ul className="item-list">
                                        {order.bill_detailSet?.map((item) => (
                                            <li key={item.id} className="item">
                                                {item.product.image_product_information && (
                                                    <img
                                                        src={item.product.image_product_information}
                                                        className="item-image"
                                                        onClick={() => handleClick(item.product.id_product_information)}
                                                    />
                                                )}
                                                <div className="item-details">
                                                    <h3>{item.product.name_product_information}</h3>
                                                    <span>Số lượng: {item.quantity}</span>
                                                    {/* <span>Mô tả: {item.detail}</span> */}
                                                    <span>Size: {item.product.size}</span>
                                                    <span>Giá tiền: {item.price}vnđ</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            <div className="total-state-container">
                                <p className="total-text">Tổng tiền: ${orders.reduce((t, e) => t + e.total, 0)}</p>
                                <p className="state-text">Trạng thái: {state[orders[0].state]}</p>

                                {orders[0].state === 0 && (
                                    <button className="total-text" onClick={() => handleSm(orders[0].id)}>
                                        Xác nhận đã giao hàng
                                    </button>
                                )}
                                {orders[0].state === 2 && (
                                    <button
                                        className="total-text"
                                        onClick={() => hanldeRePay(orders[0].transaction.id)}
                                    >
                                        Thanh toán lại
                                    </button>
                                )}
                                <div>
                                    {orders[0].state === 1 && orders[0].is_rating === false && (
                                        <button
                                            style={{ backgroundColor: 'red', color: 'white' }}
                                            className="total-text"
                                            onClick={() => openRatingModal(orders[0])}
                                        >
                                            Đánh giá
                                        </button>
                                    )}
                                    {(orders[0].state === 4 || orders[0].state === 1) && (
                                        <button
                                            style={{ backgroundColor: 'blue', color: 'white' }}
                                            className="total-text"
                                            onClick={() => handleReBuy(orders[0])}
                                        >
                                            Mua lại
                                        </button>
                                    )}
                                </div>
                                {(orders[0].state === 2 || orders[0].state === 3) && (
                                    <button
                                        style={{ backgroundColor: 'red', color: 'white' }}
                                        className="total-text"
                                        onClick={() => handleReDelete(orders[0])}
                                    >
                                        Hủy đơn
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="order-container">
                    <h2>Không có đơn hàng</h2>
                </div>
            )}
            <RatingModal isOpen={isRatingModalOpen} onClose={closeRatingModal} onSubmit={submitRating} />
        </div>
    );
};

export default MyOrder;

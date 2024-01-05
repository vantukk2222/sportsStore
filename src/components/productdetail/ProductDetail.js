import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import getUnAuth from '~/API/get';
import postCart from '~/API/postCart';
import putCart from '~/API/putCart';
import { listCartByIdUser } from '~/redux/reducers/Cart/listCartReducer';
import Loading from '../loading/Loading';
import Comment from './Comment';
import './ProductDetail.css';
import Shopdetail from './Shopdetail';
const totalStars = 5;
const ProductDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { dataCart, loadingCart, errorCart } = useSelector((state) => state.listCartReducer);
    const [productItem, setProductItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    const [start, setStart] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [id, setId] = useState(0);
    const [size, setSize] = useState('');
    const [sale, setSale] = useState(false);
    const showNextImages = () => {
        const totalImages = productItem.imageSet.length;
        const imagesToShow = 3;
        setStartIndex((prevIndex) => (prevIndex + imagesToShow < totalImages ? prevIndex + 1 : 0));
    };

    const showPrevImages = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleimg = (index) => {
        setStart(index);
    };
    const handleSize = (e) => {
        setId(productItem.productSet.find((element) => element.id === e.id).id);
        setQuantity(e.quantity);
        setPrice(e.price);
        setSize(e.size);
    };
    const addToCart = (product) => {
        const id2 = product.productSet?.find((e) => e.size == size).id;
        const id_product_information = product.productSet?.find((e) => e.size == size).id_product_information;
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
    };
    const handleAdd = (product) => {
        const user = JSON.parse(localStorage.getItem('User'));
        if (user) {
            if (size != '') addToCart(product);
            else alert('Hãy chọn loại sản phẩm mua trước khi thêm vào giỏ hàng');
        } else {
            alert('Hãy Đăng nhập trước khi mua sản phẩm');
        }
    };
    const handleBuy = (product) => {
        const user = JSON.parse(localStorage.getItem('User'));
        if (user) {
            if (size != '') {
                addToCart(product);
                setTimeout(() => navigate('/cart'), 500);
            } else alert('Hãy chọn loại sản phẩm mua trước khi mua ngay');
        } else {
            alert('Hãy Đăng nhập trước khi mua sản phẩm');
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const id = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
                const response = await getUnAuth(`product-information/${id}`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }

                response.productSet.sort((a, b) => a.id - b.id);

                setProductItem(response);
                setQuantity(response.productSet.reduce((r, e) => r + e.quantity, 0));
                setPrice(response.price_min);
                let givenTimeStr = response.sale?.ended_at || null;
                if (givenTimeStr) {
                    const givenTime = new Date(givenTimeStr);
                    const currentTime = new Date();
                    if (givenTime > currentTime) setSale(true);
                    else setSale(false);
                } else setSale(false);

                setStart(response.imageSet.find((e) => e.is_main === true).id || response.imageSet[0].id);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const calculateStarCount = () => {
        if (productItem.number_like !== undefined && productItem.number_dislike !== undefined) {
            const likeRatio = productItem.number_like / (productItem.number_like + productItem.number_dislike);
            return Math.round(likeRatio * 5);
        }
        return 0; // Trả về 0 nếu không có đủ dữ liệu
    };

    return (
        <>
            {productItem.id ? (
                <>
                    <div className="product-detail-container">
                        <div className="product-image-container">
                            <div className="main-image">
                                {productItem.imageSet && productItem.imageSet.length > 0 && (
                                    <img
                                        src={
                                            productItem.imageSet.find((e) => e.id === start)?.url ||
                                            productItem.imageSet[0].url
                                        }
                                        alt=""
                                        className="product-image"
                                    />
                                )}
                            </div>
                            <div className="product-img">
                                <button className="iconimg" onClick={showPrevImages} disabled={startIndex === 0}>
                                    <FaArrowLeft />
                                </button>
                                &nbsp;&nbsp;
                                <div className="thumbnail-images">
                                    {productItem.imageSet &&
                                        productItem.imageSet
                                            .slice(startIndex, startIndex + 3)
                                            .map((image, index) => (
                                                <img
                                                    key={startIndex + index}
                                                    src={image.url}
                                                    alt={`Product ${productItem.id} - Thumbnail ${
                                                        startIndex + index + 1
                                                    }`}
                                                    className="thumbnail-image"
                                                    onClick={() => handleimg(image.id)}
                                                />
                                            ))}
                                </div>
                                <button
                                    className="iconimg"
                                    onClick={showNextImages}
                                    disabled={startIndex >= (productItem.imageSet?.length || 0) - 1}
                                >
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                        <div className="product-info-container">
                            <h2 className="product-name">{productItem.name}</h2>
                            {calculateStarCount() > 0 && (
                                <div className="tdtable">
                                    <p>
                                        {' '}
                                        {[...Array(totalStars)].map((_, index) => (
                                            <FontAwesomeIcon
                                                key={index}
                                                icon={faStar}
                                                color={index < calculateStarCount() ? '#FFD700' : '#000000'}
                                            />
                                        ))}
                                    </p>
                                    <p style={{ textAlign: 'left', color: 'gray', fontSize: 'small' }}>
                                        Đã bán: {productItem.number_buy}
                                    </p>
                                </div>
                            )}
                            <div className="tdtable">
                                {sale && <p className="product-price crossedNumber">{price}vnđ</p>}
                                <p className="product-price ">
                                    {sale ? (price * (100 - productItem.sale?.discount)) / 100 : price}vnđ
                                </p>
                            </div>
                            <p className="product-description">
                                {' '}
                                <strong>Mô tả:</strong> {productItem.detail}
                            </p>
                            <p className="product-attribute">
                                <strong>Thuộc tính:</strong> {productItem.attribute}
                            </p>
                            <p className="product-brand">
                                <strong>Thương hiệu:</strong> {productItem.brand}
                            </p>
                            <p className="product-quantity">
                                <strong>Số lượng:</strong> {quantity}
                            </p>
                            <p className="product-size">
                                <strong>Size:</strong>
                                {productItem.productSet &&
                                    productItem.productSet.map((e, index) => {
                                        if (e.quantity > 0)
                                            return (
                                                <button
                                                    className={`sort ${e.id == id ? 'clicked' : ''}`}
                                                    key={index}
                                                    onClick={() => handleSize(e)}
                                                >
                                                    {e.size || 'Size'}
                                                </button>
                                            );
                                    })}
                            </p>
                            <p className="product-size">
                                <strong>Phân loại:</strong>
                                {productItem.categorySet &&
                                    productItem.categorySet.map((e, index) => {
                                        return (
                                            <button
                                                className={`sort ${e.id == id ? 'clicked' : ''}`}
                                                key={index}
                                                onClick={() => {
                                                    navigate(`/allproduct/${e.id}`);
                                                }}
                                            >
                                                {e.name || 'Size'}
                                            </button>
                                        );
                                    })}
                            </p>
                            <button onClick={() => handleAdd(productItem)} className="add-to-cart-button">
                                Thêm vào giỏ hàng
                            </button>
                            &nbsp;&nbsp;&nbsp;
                            <button onClick={() => handleBuy(productItem)} className="add-to-cart-button">
                                Mua ngay
                            </button>
                        </div>
                    </div>
                    <Shopdetail business={productItem.business} />
                    {/* <Detail productItem={productItem} /> */}
                    <Comment />
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default ProductDetail;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import getUnAuth from '~/API/get';
import Loading from '~/components/loading/Loading';

const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="control-btn" onClick={onClick}>
            <button className="next">
                <i className="fa fa-long-arrow-alt-right"></i>
            </button>
        </div>
    );
};
const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="control-btn" onClick={onClick}>
            <button className="prev">
                <i className="fa fa-long-arrow-alt-left"></i>
            </button>
        </div>
    );
};
const FlashCard = () => {
    const [productItems, setProductItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const flash_product = sessionStorage.getItem('flash_product');
    const product = flash_product ? JSON.parse(flash_product) : null;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getUnAuth(`product-information?page=0&page_size=100&state=0`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }

                setProductItems(response.content);
                sessionStorage.setItem('flash_product', JSON.stringify(response.content));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        if (!product) fetchData();
        else setProductItems(product);
    }, []);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    const handleClick = (id) => {
        if (id) navigate(`/product/${id}`);
    };

    return (
        <>
            {productItems ? (
                <Slider {...settings}>
                    {productItems.map((productItems) => {
                        let givenTimeStr = productItems.sale?.ended_at || null;
                        if (givenTimeStr) {
                            const givenTime = new Date(givenTimeStr);
                            const currentTime = new Date();
                            if (givenTime > currentTime) givenTimeStr = true;
                            else givenTimeStr = false;
                        } else givenTimeStr = false;
                        if (givenTimeStr)
                            return (
                                <div className="box" key={productItems.id} onClick={() => handleClick(productItems.id)}>
                                    <div className="product mtop">
                                        <div className="img">
                                            <img
                                                className="imgflashcard"
                                                src={
                                                    productItems.imageSet.find((e) => e.is_main === true)?.url ||
                                                    productItems.imageSet[0].url
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div className="product-details">
                                            <span className="spanname">{productItems.name}</span>
                                            <p style={{ textAlign: 'left', color: 'gray', fontSize: 'small' }}>
                                                Đã bán:{productItems.number_buy}
                                            </p>
                                            <div className="price ">
                                                {givenTimeStr && (
                                                    <h4 className="crossedNumber">{productItems.price_min}vnđ </h4>
                                                )}
                                                <h4>
                                                    {productItems.sale
                                                        ? (productItems.price_min *
                                                              (100 - productItems.sale?.discount)) /
                                                          100
                                                        : productItems.price_min}
                                                    vnđ
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                    })}
                </Slider>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default FlashCard;

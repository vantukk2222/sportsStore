import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchGetProducts } from '~/redux/reducers/Product/getFlashDealProduct';
import { useNavigate } from 'react-router';
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
    const dispatch = useDispatch();
    const { dataProduct, loadingProduct, errorProduct } = useSelector((state) => state.flashDealProducts);
    const [productItems, setProductItems] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchGetProducts('', page, pageSize));
    }, [page, pageSize]);
    useEffect(() => {
        if (dataProduct && dataProduct.content) setProductItems(dataProduct.content);
    }, [dataProduct]);
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
        // console.log(id);
        if (id) navigate('/shop');
    };
    return (
        <>
            <Slider {...settings}>
                {productItems.map((productItems) => {
                    return (
                        <div className="box" key={productItems.id} onClick={() => handleClick(productItems.id)}>
                            <div className="product mtop">
                                <div className="img">
                                    <img
                                        className="imgflashcard"
                                        src={productItems.imageSet.find((e) => e.is_main === true).url}
                                        alt=""
                                    />
                                </div>
                                <div className="product-details">
                                    <span className="spanname">{productItems.name}</span>
                                    {/* <div className="rate">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div> */}
                                    <div className="price">
                                        <h4>${productItems.price_min}đ </h4>
                                        {/* step : 3  
                     if hami le button ma click garryo bahne 
                    */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </>
    );
};

export default FlashCard;

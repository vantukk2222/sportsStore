import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetProducts } from '~/redux/reducers/Product/getSlideProduct';
import { useNavigate } from 'react-router';

const SlideCard = () => {
    const dispatch = useDispatch();
    const { dataProduct, loadingProduct, errorProduct } = useSelector((state) => state.slideProducts);
    const [productItems, setProductItems] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchGetProducts('', page, pageSize));
    }, [page, pageSize]);
    useEffect(() => {
        if (dataProduct && dataProduct.content) setProductItems(dataProduct.content);
    }, [dataProduct]);
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        appendDots: (dots) => {
            return <ul style={{ margin: '0px' }}>{dots}</ul>;
        },
    };
    const handleClick = (id) => {
        //  console.log(id);
        if (id) navigate(`/product/${id}`);
    };
    return (
        <>
            <Slider {...settings}>
                {productItems.map((value, index) => {
                    return (
                        <div key={index}>
                            <div className="box d_flex top slide" style={{ position: 'relative' }}>
                                <div className="left">
                                    <h1>{value.business.name}</h1>
                                    <p>{value.name}</p>
                                    <button className="btn-primary" onClick={() => handleClick(value.id)}>
                                        Xem sản phẩm
                                    </button>
                                </div>
                                <div className="right" style={{}}>
                                    <img
                                        className="img-slider"
                                        src={value.imageSet.find((e) => e.is_main === true).url}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </>
    );
};

export default SlideCard;

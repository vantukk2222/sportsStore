import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router';
import getUnAuth from '~/API/getUnAuth';
import Loading from '~/components/loading/Loading';
const SlideCard = () => {
    const [productItems, setProductItems] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getUnAuth(`product-information?page=0&page_size=5`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                setProductItems(response.content);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        // const reponse = fetch(
        //     'https://project-pbl6-production.up.railway.app/api/v1/product-information?page=0&page_size=5',
        // )
        //     .then((data) => data.json())
        //     .then((data) => setProductItems(data.content))
        //     .catch((er) => console.log(er));
    }, []);
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
        if (id) navigate(`/product/${id}`);
    };
    return (
        <>
            {productItems ? (
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
                                    <div className="right">
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
            ) : (
                <Loading />
            )}
        </>
    );
};

export default SlideCard;

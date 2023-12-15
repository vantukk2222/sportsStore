import { current } from '@reduxjs/toolkit';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import getUnAuth from '~/API/getUnAuth';
import Loading from '~/components/loading/Loading';
const ShopCart = ({ categoryItems }) => {
    const navigate = useNavigate();
    const [productItems, setProductItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleClick = (id) => {
        if (id) navigate(`/product/${id}`);
    };
    const [count, setCount] = useState(0);
    console.log(categoryItems);
    useEffect(() => {
        setCount(0);
        setProductItems([]);
    }, [categoryItems]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (!categoryItems || count >= categoryItems.length || productItems.length >= 9) return;
                const response = await getUnAuth(`product-information/find-by-category/${categoryItems[count].id}`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                setCount((prevCount) => prevCount + 1);
                const dataProduct = response.content;
                console.log(dataProduct);
                if (dataProduct && productItems.length < 9) {
                    setProductItems((prevProduct) => {
                        for (var i = 0; i < dataProduct.length; i += 1) {
                            if (prevProduct.length == 9) break;
                            prevProduct = [...prevProduct, dataProduct[i]];
                        }
                        return prevProduct;
                    });
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [categoryItems, count]);
    return (
        <>
            {productItems.length < 9 ? (
                <Loading />
            ) : (
                productItems.map((value, index) => {
                    return (
                        <div className="box" key={index} onClick={() => handleClick(value.id)}>
                            <div className="product mtop">
                                <div className="img">
                                    <img src={value.imageSet.find((e) => e.is_main === true).url} alt="" />
                                </div>
                                <div className="product-details">
                                    <h3>{value.name}</h3>
                                    <div className="price">
                                        <h4>${value.price_min}đ </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </>
    );
};

export default ShopCart;

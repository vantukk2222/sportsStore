import React from 'react';
import Catg from './Catg';
import ShopCart from './ShopCart';
import './style.css';
import { useState, memo, useEffect } from 'react';
import getUnAuth from '~/API/getUnAuth';
const Shop = () => {
    const [categoryItems, setCategoryItems] = useState(null);
    const [gcategoryItems, setGCategoryItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleClick = (value) => {
        setCategoryItems(value);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getUnAuth(`category/get-category-group`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                setGCategoryItems(response);
                setCategoryItems(response[0].categorySet);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <section className="shop background">
                <div className="container d_flex">
                    <Catg handleClick={handleClick} categoryItems={gcategoryItems} />

                    <div className="contentWidth">
                        <div className="heading d_flex">
                            <div className="heading-left row  f_flex">
                                <h2>SẢN PHẨM</h2>
                            </div>
                            <div className="heading-right row ">
                                <span>Xem tất cả</span>
                                <i className="fa-solid fa-caret-right"></i>
                            </div>
                        </div>
                        <div className="product-content  grid1">
                            <ShopCart categoryItems={categoryItems ? categoryItems : null} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default memo(Shop);

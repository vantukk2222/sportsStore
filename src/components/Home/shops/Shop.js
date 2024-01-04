import React, { useState, memo, useEffect } from 'react';
import Catg from './Catg';
import ShopCart from './ShopCart';
import './style.css';
import getUnAuth from '~/API/get';

const Shop = () => {
    const [categoryItems, setCategoryItems] = useState(null);
    const [gcategoryItems, setGCategoryItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const group_cate = sessionStorage.getItem('group_cate');
    const group_category = group_cate ? JSON.parse(group_cate) : null;
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
                sessionStorage.setItem('group_cate', JSON.stringify(response));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        if (!group_category) fetchData();
        else {
            setGCategoryItems(group_category);
            setCategoryItems(group_category[0].categorySet);
        }
    }, []);
    return (
        <section className="shop background">
            <div className="container d_flex">
                <Catg handleClick={handleClick} categoryItems={gcategoryItems} />

                <div className="contentWidth">
                    <div className="heading d_flex">
                        <div className="heading-left row  f_flex">
                            <h2>SẢN PHẨM</h2>
                        </div>
                        {/* <div className="heading-right row ">
                            <span>Xem tất cả</span>
                            <i className="fa-solid fa-caret-right"></i>
                        </div> */}
                    </div>
                    <div className="product-content  grid1">
                        <ShopCart categoryItems={categoryItems || []} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Shop;

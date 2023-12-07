import React from 'react';
import Catg from './Catg';
import ShopCart from './ShopCart';
import './style.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Shop = () => {
    const { dataCate, loadingCate, erroCate } = useSelector((state) => state.categories);
    const [categoryItems, setCategoryItems] = useState(dataCate[0].categorySet);
    const handleClick = (value) => {
        setCategoryItems(value);
    };
    return (
        <>
            <section className="shop background">
                <div className="container d_flex">
                    <Catg handleClick={handleClick} />

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
                            <ShopCart categoryItems={categoryItems}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Shop;

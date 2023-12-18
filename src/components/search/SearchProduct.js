import React, { useEffect } from 'react';
import { useState } from 'react';
import './Search.css';
import MenuSearch from './MenuSearch';
import SearchShop from './SearchShop';
import Sortproduct from '../Shop/Sortproduct';
import ProductCart from '../Shop/ProductCart';
import Pagination from '../Shop/Pagination';
import getUnAuth from '~/API/get';
import { useLocation } from 'react-router';
const SearchProduct = () => {
    const location = useLocation();
    const name = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productItems, setProductItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getUnAuth(`product-information/search?name=${name}`);
                setProductItems(response.content);
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
    }, [location]);
    return (
        <>
            <section className="shop background">
                <div className="container d_flex">
                    {/* <MenuSearch shopItems={shopItems} apiCate={apiCate} /> */}

                    <div className="contentWidth">
                        <h2>Kết quả tìm kiếm cho từ khóa "{decodeURIComponent(name)}"</h2>
                        <div className="heading d_flex"></div>
                        <div className="product-content  grid1">
                            <ProductCart productItems={productItems} />
                        </div>
                        <div>
                            <Pagination />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SearchProduct;

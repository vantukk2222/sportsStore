import React, { useEffect } from 'react';
import { useState } from 'react';
import './Search.css';
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
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPage] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getUnAuth(
                    `product-information/search?name=${name}&page=${page}&page_size=20&state=0&state_business=0`,
                );
             
                setProductItems(response.content);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                setTotalPage(response.totalPages);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [location, page]);
   
    return (
        <>
            <section className="shop background">
                <div className="container d_flex">
                    {/* <MenuSearch shopItems={shopItems} apiCate={apiCate} /> */}

                    {productItems.length > 0 ? (
                        <div className="contentWidth">
                            <h2>Kết quả tìm kiếm cho từ khóa "{decodeURIComponent(name)}"</h2>
                            <div className="heading d_flex"></div>
                            <div className="product-content  grid2">
                                <ProductCart productItems={productItems} />
                            </div>
                            <div>
                                {totalPages > 1 && (
                                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                                )}
                            </div>
                        </div>
                    ) : (
                        <h2>Không có sản phẩm bạn muốn tìm kiếm</h2>
                    )}
                </div>
            </section>
        </>
    );
};

export default SearchProduct;

// SearchAllShops.js
import React, { useEffect, useState } from 'react';
import Shop from './Shop.js';
import './allShop.css';
import { useLocation } from 'react-router';
import getUnAuth from '~/API/get.js';
import Pagination from '~/components/Shop/Pagination.js';

const SearchallShop = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shops, setShops] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const name = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
                const response = await getUnAuth(`business/search?name=${name}&page=${page}&page_size=10&state=0`);
              
                setShops(response.content);
                setTotalPage(response.totalPages);
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
    }, [location, page]);
    return (
        <>
            {shops.length > 0 ? (
                <React.Fragment>
                    <h2>Shop liên quan đến : </h2>
                    <div className="allshop-list">
                        {shops.map((shop, index) => (
                            <Shop key={index} shop={shop} />
                        ))}
                    </div>
                    {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
                </React.Fragment>
            ) : (
                <div>
                    <h2>Không có Shop mà bạn muốn tìm kiếm</h2>
                </div>
            )}
        </>
    );
};

export default SearchallShop;

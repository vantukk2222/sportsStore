import React from 'react';
import { useState } from 'react';
import './Search.css';
import MenuSearch from './MenuSearch';
import SearchShop from './SearchShop';
import Sortproduct from '../Shop/Sortproduct';
import ProductCart from '../Shop/ProductCart';
import Pagination from '../Shop/Pagination';
const shopItems = [
    {
        id: 1,
        name: 'Product 1',
        discount: 10,
        imageSet: [
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/22/873088/Ronaldo1.jpg' },
            { url: 'https://example.com/image2.jpg' },
            // Add more images if needed
        ],
        price: 100000,
    },
    {
        id: 2,
        name: 'Product 2',
        discount: 15,
        imageSet: [
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/22/873088/Ronaldo1.jpg' },
            { url: 'https://example.com/image4.jpg' },
            // Add more images if needed
        ],
        price: 150000,
    },
    {
        id: 3,
        name: 'Product 2',
        discount: 15,
        imageSet: [
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/22/873088/Ronaldo1.jpg' },
            { url: 'https://example.com/image4.jpg' },
        ],
        price: 150000,
    },
    {
        id: 3,
        name: 'Product 2',
        discount: 15,
        imageSet: [
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/22/873088/Ronaldo1.jpg' },
            { url: 'https://example.com/image4.jpg' },
        ],
        price: 150000,
    },
    {
        id: 3,
        name: 'Product 2',
        discount: 15,
        imageSet: [
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/22/873088/Ronaldo1.jpg' },
            { url: 'https://example.com/image4.jpg' },
        ],
        price: 150000,
    },
    {
        id: 3,
        name: 'Product 2',
        discount: 15,
        imageSet: [
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/22/873088/Ronaldo1.jpg' },
            { url: 'https://example.com/image4.jpg' },
        ],
        price: 150000,
    },
    {
        id: 3,
        name: 'Product 2',
        discount: 15,
        imageSet: [
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/22/873088/Ronaldo1.jpg' },
            { url: 'https://example.com/image4.jpg' },
        ],
        price: 150000,
    },
    {
        id: 3,
        name: 'Product 2',
        discount: 15,
        imageSet: [
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/22/873088/Ronaldo1.jpg' },
            { url: 'https://example.com/image4.jpg' },
        ],
        price: 150000,
    },
    {
        id: 3,
        name: 'Product 2',
        discount: 15,
        imageSet: [
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/22/873088/Ronaldo1.jpg' },
            { url: 'https://example.com/image4.jpg' },
        ],
        price: 150000,
    },
    {
        id: 3,
        name: 'Product 2',
        discount: 15,
        imageSet: [
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/22/873088/Ronaldo1.jpg' },
            { url: 'https://example.com/image4.jpg' },
        ],
        price: 150000,
    },
];
const SearchProduct = ({ addToCart, apiCate }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Số sản phẩm trên mỗi trang

    const totalItems = shopItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentData = shopItems.slice(startIndex, endIndex);
        return currentData;
    };
    return (
        <>
            <section className="shop background">
                <div className="container d_flex">
                    <MenuSearch shopItems={shopItems} apiCate={apiCate} />

                    <div className="contentWidth">
                        <div className="heading d_flex">
                            <SearchShop />
                        </div>
                        <h2>Kết quả tìm kiếm cho từ khóa " "</h2>

                        <div className="heading d_flex">
                            <Sortproduct />
                        </div>
                        <div className="heading d_flex">
                            <div className="heading-left row  f_flex">
                                <h2>SẢN PHẨM CỦA SHOP</h2>
                            </div>
                            <div className="heading-right row ">
                                <span>Xem tất cả</span>
                                <i className="fa-solid fa-caret-right"></i>
                            </div>
                        </div>
                        <div className="product-content  grid1">
                            <ProductCart addToCart={addToCart} shopItems={getCurrentPageData()} />
                        </div>
                        <div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SearchProduct;

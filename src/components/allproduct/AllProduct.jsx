import { useState } from 'react';
import Pagination from '../Shop/Pagination';
import Catg from './Catg';
import ProductCart from './ProductCart';
import './allproduct.css';
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

const AllProduct = ({ addToCart, apiCate }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalItems = shopItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handlePageChange = () => {};
    return (
        <>
            <section className="shop ">
                <div className=" d_flex">
                    <Catg />

                    <div className="contentWidth">
                        <div className="heading d_flex"></div>
                        <div className="heading d_flex">
                            <div className="heading-left row f_flex">
                                <h2>TẤT CẢ SẢN PHẨM</h2>
                            </div>
                            <div className="heading-right row">
                                <i className="fa-solid fa-caret-right"></i>
                            </div>
                        </div>
                        <div className="product-content grid1">
                            <ProductCart shopItems={shopItems} />
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default AllProduct;

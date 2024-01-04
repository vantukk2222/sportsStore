import { useEffect, useState } from 'react';
import Pagination from '../Shop/Pagination';
import Catg from './Catg';
import ProductCart from './ProductCart';
import './allproduct.css';
import { useLocation, useNavigate } from 'react-router';
import getUnAuth from '~/API/get';

const AllProduct = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPage] = useState(0);
    const id = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await getUnAuth(
                    `product-information/find-by-category/${id}?page=${page}&page_size=20&state=0&state_business=0`,
                );
                setProducts(response.content);
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
    }, [id]);
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
                            <ProductCart products={products} />
                        </div>
                        {totalPages > 1 && (
                            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AllProduct;

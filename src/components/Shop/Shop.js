import MainShop from './MainShop';
import { useState, useEffect } from 'react';
import Tips from './tips/Tips';
import { useLocation } from 'react-router-dom';
import getUnAuth from '~/API/getUnAuth';
import Loading from '../loading/Loading';
import Pagination from './Pagination';
import Sortproduct from './Sortproduct';
import ProductCart from './ProductCart';
import Catg from './Catg';
const Shop = () => {
    const location = useLocation();
    const [shopItem, setShopItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productItems, setProductItems] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const id = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
                let response = await getUnAuth(`business/${id}`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                setShopItem(response);
                response = await getUnAuth(`product-information/find-by-business/${id}?page=${page}&page_size=20`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                // let a = [];
                // a.push(
                //     response.content.reduce((r, e) => {
                //         if (r.length == 5) {
                //             a.push(r);
                //             r = [];
                //         }
                //         r = [...r, e];
                //         return r;
                //     }, []),
                // );
                setProductItems(response.content);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    //console.log(productItems);
    return (
        <>
            {shopItem?.id ? (
                <section className="shop background">
                    <MainShop shopItem={shopItem} />
                    <Tips shopItem={shopItem} />
                    <div className="container d_flex">
                        {/* <Catg shopItems={shopItem} /> */}

                        <div className="contentWidth">
                            {/* <div className="heading d_flex">
                                <Sortproduct />
                            </div> */}
                            <div className="heading d_flex">
                                <div className="heading-left row f_flex">
                                    <h2>SẢN PHẨM CỦA SHOP</h2>
                                </div>
                            </div>
                            <div className="product-content grid2">
                                <ProductCart productItems={productItems} />
                            </div>
                            <Pagination />
                        </div>
                    </div>
                </section>
            ) : (
                <Loading />
            )}
        </>
    );
};
export default Shop;

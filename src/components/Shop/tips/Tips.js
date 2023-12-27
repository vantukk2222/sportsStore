import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import './style.css';
import getUnAuth from '~/API/get';
import Loading from '~/components/loading/Loading';

const Tips = ({ shopItem }) => {
    const [productItems, setProductItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getUnAuth(`product-information/find-by-business/${shopItem.id}?state=0`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                setProductItems(response.content.slice(0, 6));
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
            {productItems?.length > 0 ? (
                <section className="NewArrivals background">
                    <div className="container">
                        <div className="heading d_flex">
                            <div className="heading-left row  f_flex">
                                <img src="https://img.icons8.com/glyph-neue/64/26e07f/new.png" />
                                <h2> Gợi ý cho bạn </h2>
                            </div>
                        </div>
                        <Cart productItems={productItems} />
                    </div>
                </section>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Tips;

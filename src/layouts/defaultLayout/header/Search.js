import getUnAuth from '~/API/get';
import logoImage from './logo.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Search = ({ id }) => {
    const cart = JSON.parse(localStorage.getItem('Cart'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getUnAuth(`cart/get-by-id-user/${id}`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
               // console.log(response);
                localStorage.setItem('Cart', JSON.stringify(response));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchData();
    }, [id]);
    return (
        <>
            <section className="search">
                <div className="container c_flex">
                    <div className="logo width ">
                        <Link to="/">
                            <img src={logoImage} alt="DT5 SPORT" />
                        </Link>
                    </div>
                    <div className="search-box f_flex">
                        <i className="fa fa-search"></i>
                        <input type="text" placeholder="Tìm kiếm..." />
                        {/* <span>Tìm kiếm</span> */}
                    </div>
                    <div className="icon f_flex width">
                        <div className="cart">
                            <Link to="/cart">
                                <i className="fa fa-shopping-bag icon-circle"></i>
                                {cart?.length > 0 ? <span>{cart.length}</span> : <></>}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Search;

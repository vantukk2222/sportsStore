import getUnAuth from '~/API/get';
import logoImage from './logooo.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Search = ({ id }) => {
    const cart = JSON.parse(localStorage.getItem('Cart'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    window.addEventListener('scroll', function () {
        const search = document.querySelector('.search');
        search.classList.toggle('active', window.scrollY > 100);
    });
    const [searchValue, setSearchValue] = useState('');

    const [showMenu, setShowMenu] = useState(false);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        setShowMenu(value.trim() != '');
    };
    const handleLinkClick = (event) => {
        event.preventDefault();
    };
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
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchValue}
                            onChange={(e) => handleInputChange(e)}
                        />
                        {showMenu && (
                            <div className="search-menu">
                                <ul>
                                    <li>
                                        <Link to={`/searchShop/${searchValue}`}>
                                            Tìm kiếm theo shop: {searchValue}{' '}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/searchProduct/${searchValue}`}>
                                            Tìm kiếm theo sản phẩm: {searchValue}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
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

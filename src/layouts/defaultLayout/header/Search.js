import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listCartByIdUser } from '~/redux/reducers/Cart/listCartReducer';
import logoImage from './logooo.png';

const Search = () => {
    const dispatch = useDispatch();
    const { dataCart, loadingCart, errorCart } = useSelector((state) => state.listCartReducer);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem('User'));
    window.addEventListener('scroll', function () {
        const search = document.querySelector('.search');
        search?.classList.toggle('active', window.scrollY > 100);
    });
    const [searchValue, setSearchValue] = useState('');

    const [showMenu, setShowMenu] = useState(false);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        setShowMenu(value.trim() != '');
    };
    useEffect(() => {
        if (user?.id) dispatch(listCartByIdUser(user.id));
    }, [user?.id]);
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
                                        <Link to={`/searchShop/${encodeURIComponent(searchValue)}`}>
                                            Tìm kiếm theo shop: {searchValue}{' '}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/searchProduct/${encodeURIComponent(searchValue)}`}>
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
                                {dataCart?.length > 0 ? <span>{dataCart.length}</span> : <></>}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Search;

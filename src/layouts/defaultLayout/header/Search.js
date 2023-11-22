import logoImage from './logo.png';
import { Link } from 'react-router-dom';

const Search = () => {
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
                        <span>Tìm kiếm</span>
                    </div>
                    <div className="icon f_flex width">
                        <i className="fa fa-user icon-circle"></i>
                        <div className="cart">
                            <Link to="/cart">
                                <i className="fa fa-shopping-bag icon-circle"></i>
                                <span>{}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Search;

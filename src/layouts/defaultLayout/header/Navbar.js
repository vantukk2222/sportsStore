import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <header className="header">
                <div className="container d_flex">
                    <div className="catgrories d_flex"></div>
                    <div className="navlink">
                        <ul className="link f_flex capitalize">
                            <li>
                                <Link to="/">Trang chủ</Link>
                            </li>
                            <li>
                                <Link to="/product">Sản Phẩm</Link>
                            </li>
                            <li>
                                <Link to="/track">Theo dõi đơn hàng</Link>
                            </li>
                            <li>
                                <Link to="/contact">Liên hệ</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;

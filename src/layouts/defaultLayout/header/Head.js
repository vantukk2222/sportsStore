import { Link, useNavigate } from 'react-router-dom';
import './head.css';
const Head = ({ userName }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        const path = window.location.pathname;
        if (path == '/') window.location.reload();
        else navigate('/');
    };
    return (
        <>
            <section className="head">
                <div className="container d_flex">
                    <div className="left row">
                        📞
                        <label> +03 99 23 52 54</label>
                        ✉️
                        <label> dt5@gmail.com</label>
                    </div>
                    <div className="right row RText">
                        <label>
                            <Link to="/contact">📧 Liên hệ</Link>
                        </label>
                        {userName ? (
                            <div className="account-menu">
                                <label>
                                    <Link to="/account">👤 {userName}</Link>
                                </label>
                                <ul>
                                    <li>
                                        <Link to="/myacc">👤 Hồ sơ của tôi</Link>
                                    </li>
                                    <li>
                                        <Link to="/track">🛒 Đơn hàng</Link>
                                    </li>
                                    <li>
                                        <p onClick={() => handleLogout()}>🚪 Đăng xuất</p>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <>
                                {' '}
                                <label>
                                    <Link to="/login">Đăng nhập</Link>
                                </label>
                                <label>
                                    <Link to="/register">Đăng ký</Link>
                                </label>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Head;

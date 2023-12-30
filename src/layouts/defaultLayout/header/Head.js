import { Link } from 'react-router-dom';
import './head.css';
import { useEffect, useState } from 'react';
const Head = () => {
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        const path = window.location.pathname;
        if (path == '/') window.location.reload();
        else window.location.assign('/');
    };
    const user = JSON.parse(localStorage.getItem('User'));
    const [name, setName] = useState(null);
    useEffect(() => {
        setName(user?.name);
    }, [user]);
    return (
        <>
            <section className="head">
                <div className="container d_flex">
                    <div className="left row">
                        📞
                        <label> +03 99 23 52 54</label>
                        ✉️
                        <label>
                            <Link to="/login">Kênh người bán</Link>
                        </label>
                    </div>
                    <div className="right row RText">
                        <label>
                            <Link to="/contact">📧 Liên hệ</Link>
                        </label>
                        {user ? (
                            <div className="account-menu">
                                <label>
                                    <Link to="/profile">👤 {name}</Link>
                                </label>
                                <ul>
                                    <li>
                                        <Link to="/profile">👤 Hồ sơ của tôi</Link>
                                    </li>
                                    <li>
                                        <Link to="/order/5">🛒 Đơn hàng</Link>
                                    </li>
                                    <li>
                                        <Link onClick={(e) => handleLogout(e)}>🚪 Đăng xuất</Link>
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

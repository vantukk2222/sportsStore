import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './head.css';
import { useNavigate } from 'react-router';
import checkToken from '~/API/checkToken';

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
    const navigate = useNavigate();
    useEffect(() => {
        setName(user?.name);
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        const check = async () => {
            try {
                const response = await checkToken(authToken);
                console.log(response);
                if (response.status == 401 && authToken) {
                    localStorage.clear();
                    window.location.reload();
                }
            } catch (error) {
                console.error(error);
            }
        };
        check();
    }, [user]);

    return (
        <>
            <section className="head">
                <div className="container d_flex">
                    <div className="left row">
                        {!user && (
                            <>
                                <label>
                                    <Link to="/login">Kênh ADMIN</Link>
                                </label>
                                <label>
                                    <Link to="/login">Kênh người bán</Link>
                                </label>
                            </>
                        )}
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
                                        <Link to="/order">🛒 Đơn hàng</Link>
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

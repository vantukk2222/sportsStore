import { Link, useNavigate } from 'react-router-dom';
import './headerbusiness.css';
import { useDispatch, useSelector } from 'react-redux';
import logoImage from './logooo.png';
import { roleByUserName } from '~/redux/reducers/Role/role';
const HeaderBusiness = () => {
    const user = JSON.parse(localStorage.getItem('User'));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        dispatch(roleByUserName(false));
        navigate('/login');
    };
    return (
        <>
            <section className="headlogin">
                <div className="header-container">
                    <Link to="/">
                        <img src={logoImage} className="imgheaderlogin" alt="Logo" />
                    </Link>
                    <label className="dn">
                        <h3>KÊNH NGƯỜI BÁN</h3>
                    </label>
                    {user && (
                        <div className="account-menu">
                            <label>
                                <Link to="/profile">👤 {user.un}</Link>
                            </label>
                            <ul>
                                <li>
                                    <Link to="/profile">👤 Hồ sơ của tôi</Link>
                                </li>
                                <li>
                                    <Link onClick={(e) => handleLogout(e)}>🚪 Đăng xuất</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                    <label className="label-left lableheaderlogin">
                        <Link to="/contact"> Bạn cần giúp đỡ gì?</Link>
                    </label>
                </div>
            </section>
        </>
    );
};

export default HeaderBusiness;

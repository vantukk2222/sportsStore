import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { roleByUserName } from '~/redux/reducers/Role/role';
import './headerbusiness.css';
import logoImage from './logooo.png';
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
                <div className="headercontainer">
                    <Link to="/">
                        <img src={logoImage} className="imgheaderlogin" alt="Logo" />
                    </Link>
                    <label className="dn">
                        <h3>DT5 SPORT</h3>
                    </label>
                    <label className="dn">
                        <h3 className="h3dn">KÊNH NGƯỜI BÁN</h3>
                    </label>
                    {user && (
                        <div className="menuhearbussiness">
                            <div className="account-menu">
                                <label>
                                    <Link to="/profile">👤 {user.name}</Link>
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
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default HeaderBusiness;

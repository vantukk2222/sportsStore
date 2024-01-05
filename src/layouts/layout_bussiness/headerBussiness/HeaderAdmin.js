import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { roleByUserName } from '~/redux/reducers/Role/role';
import './headerbusiness.css';
import logoImage from './logooo.png';
import checkToken from '~/API/checkToken';
import { useEffect } from 'react';
const HeaderAdmin = () => {
    const user = JSON.parse(localStorage.getItem('User'));

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        dispatch(roleByUserName(false));
        navigate('/login');
    };
    useEffect(() => {
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
    }, []);
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
                        <h3 className="h3dn">KÊNH ADMIN</h3>
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

export default HeaderAdmin;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import getUnAuth from '~/API/get';
import loginPage from '~/API/postAuth';
import { listBillById } from '~/redux/reducers/Bill/listBillReducer';
import { roleByUserName } from '~/redux/reducers/Role/role';
import ForgotPasswordModal from './ForgotPasswordModal';
import './style.css';
const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const store = JSON.parse(localStorage.getItem('authToken'));

    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

    const { dataRole, loadingRole, errorRole } = useSelector((state) => state.roleReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        if (store) navigate('/');
    }, []);
    const fetchData = async (un, pw) => {
        try {
            const response = await loginPage(un, pw);
            if (!response) {
                throw new Error('Network response was not ok');
            }
            const { token } = response;
            localStorage.setItem('authToken', JSON.stringify(token));
            sessionStorage.clear();
            if (token) {
                localStorage.setItem('User', JSON.stringify(un));
                const fetchData = async () => {
                    try {
                        setLoading(true);
                        let response = await getUnAuth(`user/get-by-username/${un}`);
                        if (!response) {
                            throw new Error('Network response was not ok');
                        }
                        localStorage.setItem(
                            'User',
                            JSON.stringify({
                                id: response.id,
                                un: response.username,
                                name: response.name,
                            }),
                        );
                    } catch (error) {
                        setError(error);
                    } finally {
                        setLoading(false);
                    }
                };
                fetchData()
                    .then(dispatch(roleByUserName(un)))
                    .then(() => {
                        const user = JSON.parse(localStorage.getItem('User'));
                        dispatch(listBillById(user.id, dataRole));
                        localStorage.setItem('State', JSON.stringify(5));
                    })
                    .then(navigate('/'));
            }
        } catch (error) {
            alert('Bạn đã đăng nhập thất bại kiểm tra lại mật khẩu và tài khoản của bạn');
        } finally {
            setLoading(false);
        }
    };
    function handleLogin(un, pw) {
        fetchData(un, pw);
    }
    return (
        <div className="loginn">
            <div className="login-container col-12 col-sm-4">
                <div className="title">Đăng nhập</div>
                <div className="text">Tài khoản</div>
                <input
                    className="input"
                    type="text"
                    placeholder="Tài khoản..."
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <div className="input-2">
                    <div className="text">Mật khẩu </div>

                    <input
                        className="input"
                        type={isShowPassword === true ? 'text' : 'password'}
                        placeholder="Mật Khẩu..."
                        value={password}
                        onChange={(event) => setpassword(event.target.value)}
                    />
                    <i
                        className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    ></i>
                </div>
                <p className="p" onClick={() => setShowForgotPasswordModal(true)}>
                    Quên mật khẩu ?
                </p>

                <button
                    className={username && password ? 'button-1' : ''}
                    disabled={username && password ? false : true}
                    onClick={() => handleLogin(username, password)}
                >
                    {/* {loadingApi && <i class="fas fa-sync fa-spin"></i>} */}
                    &nbsp;Đăng nhập
                </button>

                <div className="back">
                    <i className="fa-solid fa-angles-left"></i>
                    <span>
                        <Link to="/">Trang chủ</Link>
                    </span>

                    <span>
                        <Link to="/register">
                            {' '}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Đăng ký ngay{' '}
                        </Link>
                    </span>
                </div>
            </div>
            {showForgotPasswordModal && <ForgotPasswordModal onClose={() => setShowForgotPasswordModal(false)} />}
        </div>
    );
};

export default Login;

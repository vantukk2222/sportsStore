import React, { useState, useEffect } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setpassword] = useState('');
    // const { authToken, isLoading, error } = useSelector((state) => state.loginUser);
    const [isShowPassword, setIsShowPassword] = useState(false);
    function handleLogin(un, pw) {
        //  dispatch(loginUser(un, pw));
    }
    // useEffect(() => {
    //     if (authToken) navigate('/');
    // }, [authToken]);
    return (
        <div className="login-container col-12 col-sm-4">
            <div className="title">Log in</div>
            <div className="text">Email or Username</div>
            <input
                className="input"
                type="text"
                placeholder="Email or username..."
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <div className="input-2">
                <div className="text">Mật khẩu </div>

                <input
                    className="input"
                    type={isShowPassword === true ? 'text' : 'password'}
                    placeholder="Password..."
                    value={password}
                    onChange={(event) => setpassword(event.target.value)}
                />
                <i
                    className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>
            {/* <p className="p">forgot password?</p> */}
            <button
                className={username && password ? 'button-1' : ''}
                disabled={username && password ? false : true}
                onClick={() => handleLogin(username, password)}
            >
                {/* {loadingApi && <i class="fas fa-sync fa-spin"></i>} */}
                &nbsp;Login
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
    );
};

export default Login;

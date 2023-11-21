import React, { useEffect, useState } from 'react';
//import { loginApi } from '../services/UserService';
import './style.css';
import { Link } from 'react-router-dom';
//import { UserContext } from '../context/UserContext';
const Register = () => {
    //const { loginContext } = useContext(UserContext);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const [loadingApi, setloadingApi] = useState(false);

    const handleLogin = async () => {};

    return (
        <div className="login-container col-12 col-sm-4">
            <div className="title">ĐĂNG KÝ</div>
            <div className="text">Nhập họ và tên </div>
            <input
                className="input"
                type="text"
                placeholder="Nhập họ và tên..."
                value={email}
                onChange={(event) => setemail(event.target.value)}
            />
            <div className="text">Email or Username </div>
            <input
                className="input"
                type="text"
                placeholder="Email or username..."
                value={email}
                onChange={(event) => setemail(event.target.value)}
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
                <div className="text">Nhập lại Mật khẩu </div>
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
                <div className="text">Ảnh của bạn </div>

                <input className="input" type="file" id="profileImage" />
            </div>
            <p className="p">forgot password?</p>
            <button
                className={email && password ? 'button-1' : ''}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >
                {loadingApi && <i class="fas fa-sync fa-spin"></i>}
                &nbsp;Đăng ký
            </button>

            <div className="back">
                <i className="fa-solid fa-angles-left"></i>
                <span>
                    <Link to="/">Trang chủ</Link>
                </span>

                <span>
                    <Link to="/login">
                        {' '}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Đăng nhập ngay{' '}
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Register;

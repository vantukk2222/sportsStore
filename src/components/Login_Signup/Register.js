import React, { useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
const Register = () => {
    const [email, setemail] = useState('');
    const [name, setname] = useState('');

    const [password, setpassword] = useState('');

    const [repassword, setrepassword] = useState('');

    const [isShowPassword, setIsShowPassword] = useState(false);

    const [loadingApi, setloadingApi] = useState(false);

    const handleRes = async () => {};

    return (
        <div className="loginn">
            <div className="login-container ">
                <div className="title">ĐĂNG KÝ</div>
                <div className="text">Nhập họ và tên </div>
                <input
                    className="input"
                    type="text"
                    placeholder="Nhập họ và tên..."
                    value={name}
                    onChange={(event) => setname(event.target.value)}
                />
                <div className="text">Email hoặc tên đăng nhập </div>
                <input
                    className="input"
                    type="text"
                    placeholder="Email hoặc tên đăng nhập..."
                    value={email}
                    onChange={(event) => setemail(event.target.value)}
                />
                <div className="input-2">
                    <div className="text">Mật khẩu </div>
                    <input
                        className="input"
                        type={isShowPassword === true ? 'text' : 'password'}
                        placeholder="Mật khẩu..."
                        value={password}
                        onChange={(event) => setpassword(event.target.value)}
                    />
                    <div className="text">Nhập lại Mật khẩu </div>
                    <input
                        className="input"
                        type={isShowPassword === true ? 'text' : 'password'}
                        placeholder="Nhập lại mật khẩu..."
                        value={repassword}
                        onChange={(event) => setrepassword(event.target.value)}
                    />
                    <i
                        className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    ></i>
                    <div className="text">Ảnh của bạn </div>

                    <input className="input" type="file" id="profileImage" />
                </div>
                <p className="p">Bạn đã có tài khoản ?</p>
                <button
                    className={email && password ? 'button-1' : ''}
                    disabled={email && password && name && repassword ? false : true}
                    onClick={() => handleRes()}
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
        </div>
    );
};

export default Register;

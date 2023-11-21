import React, { useState } from 'react';
import axios from 'axios';
//import { loginApi } from '../services/UserService';
import './style.css';
import { Link } from 'react-router-dom';
//import { UserContext } from '../context/UserContext';
const Login = (onLoginSuccess) => {
    //const { loginContext } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setpassword] = useState('');

    const [isShowPassword, setIsShowPassword] = useState(false);

    const [loadingApi, setloadingApi] = useState(false);

    // useEffect(() => {
    //     let token = localStorage.getItem("token");
    //     if (token) {
    //         navigate("/")
    //     }
    // })

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/v1/auth/signin', {
                username,
                password,
            });

            // Xử lý phản hồi từ server ở đây
            onLoginSuccess('ádsd', response.data);

            // Lưu trạng thái đăng nhập, thông tin người dùng, vv. nếu cần
        } catch (error) {
            // Xử lý lỗi ở đây
            console.error('Lỗi khi đăng nhập:', error.message);
        }
    };

    return (
        <div className="login-container col-12 col-sm-4">
            <div className="title">Log in</div>
            <div className="text">Email or Username </div>
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
            <p className="p">forgot password?</p>
            <button
                className={username && password ? 'button-1' : ''}
                disabled={username && password ? false : true}
                onClick={() => handleLogin()}
            >
                {loadingApi && <i class="fas fa-sync fa-spin"></i>}
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

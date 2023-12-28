import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import postRegister from '~/API/postsignup';

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        name: '',
        phone: '',
        email: '',
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingApi, setLoadingApi] = useState(false);

    const handleRes = async () => {
        console.log(userData);
        try {
            const response = await postRegister(userData);
            if (!response) {
                throw new Error('Network response was not ok');
            }
            const { token } = response;
            console.log(token);
            localStorage.setItem('authToken', JSON.stringify(token));
            sessionStorage.clear();
            if (token) {
                //     console.log(response);
                localStorage.setItem('User', JSON.stringify(userData.username));
                navigate('/');
            }
        } catch (error) {
            alert('Bạn đã đăng nhập thất bại kiểm tra lại mật khẩu và tài khoản của bạn');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            [field]: value,
        }));
    };

    return (
        <div className="loginn">
            <div className="login-container ">
                <div className="title">ĐĂNG KÝ</div>
                <div className="text">Nhập tên đăng nhập</div>
                <input
                    className="input"
                    type="text"
                    placeholder="Nhập tên đăng nhập..."
                    value={userData.username}
                    onChange={(event) => handleChange('username', event.target.value)}
                />
                <div className="text">Nhập họ và tên</div>
                <input
                    className="input"
                    type="text"
                    placeholder="Nhập họ và tên..."
                    value={userData.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                />
                <div className="text">Nhập số điện thoại</div>
                <input
                    className="input"
                    type="text"
                    placeholder="Nhập số điện thoại..."
                    value={userData.phone}
                    onChange={(event) => handleChange('phone', event.target.value)}
                />
                <div className="text">Nhập địa chỉ email</div>
                <input
                    className="input"
                    type="text"
                    placeholder="Nhập địa chỉ email..."
                    value={userData.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                />
                <div className="text">Nhập mật khẩu</div>
                <input
                    className="input"
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu..."
                    value={userData.password}
                    onChange={(event) => handleChange('password', event.target.value)}
                />

                <button
                    className={userData.email && userData.password ? 'button-1' : ''}
                    disabled={
                        userData.email && userData.password && userData.name && userData.phone && userData.email
                            ? false
                            : true
                    }
                    onClick={() => handleRes()}
                >
                    Đăng ký
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

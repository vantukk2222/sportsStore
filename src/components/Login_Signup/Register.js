import { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        name: '',
        phone: '',
        email: '',
    });

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingApi, setLoadingApi] = useState(false);

    const handleRes = async () => {
        const { username, password, name, phone, email } = userData;

        setUserData({
            username: '',
            password: '',
            name: '',
            phone: '',
            email: '',
        });
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
                <div className="text">Nhập mật khẩu</div>
                <input
                    className="input"
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu..."
                    value={userData.password}
                    onChange={(event) => handleChange('password', event.target.value)}
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

                <button
                    className={userData.email && userData.password ? 'button-1' : ''}
                    disabled={
                        userData.email && userData.password && userData.name && userData.phone && userData.email
                            ? false
                            : true
                    }
                    onClick={() => handleRes()}
                >
                    {loadingApi && <i className="fas fa-sync fa-spin"></i>}
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

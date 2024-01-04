import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import postRegister from '~/API/postsignup';
import './style.css';
import getUnAuth from '~/API/get';
import { useDispatch, useSelector } from 'react-redux';
import { listBillById } from '~/redux/reducers/Bill/listBillReducer';
import { roleByUserName } from '~/redux/reducers/Role/role';

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        name: '',
        phone: '',
        email: '',
        // cic: '', // New field
        // address: '', // New field
    });
    const { dataRole, loadingRole, errorRole } = useSelector((state) => state.roleReducer);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingApi, setLoadingApi] = useState(false);
    const [selectedRole, setSelectedRole] = useState(10);
    const dispatch = useDispatch();
    const handleRes = async () => {
       
        let role = '';
        let response = '';
        try {
            if (selectedRole == 10) role = 'signup-customer';
            else role = 'signup-business';
            response = await postRegister(userData, role);
            if (!response) {
                throw new Error('Network response was not ok');
            }
            const { token } = response;
           
            localStorage.setItem('authToken', JSON.stringify(token));
            sessionStorage.clear();
            if (token && selectedRole == 10) {
                localStorage.setItem('User', JSON.stringify(userData.username));
                const fetchData = async () => {
                    try {
                        setLoading(true);
                        let response = await getUnAuth(`user/get-by-username/${userData.username}`);
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
                    .then(dispatch(roleByUserName(userData.username)))
                    .then(() => {
                        const user = JSON.parse(localStorage.getItem('User'));
                        dispatch(listBillById(user.id, dataRole));
                        localStorage.setItem('State', JSON.stringify(5));
                    })
                    .then(navigate('/'));
            }
        } catch (error) {
            alert(
                `Bạn đã đăng kí thất bại vì bị trùng tên đăng nhập, số điện thoại hoặc email. Kiểm tra lại thông tin của bạn`,
            );
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

    const handleChangeRole = (event) => {
        setSelectedRole(event.target.value);
    };

    return (
        <div className="loginn">
            <div className="login-container">
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
                {selectedRole === 20 && (
                    <>
                        <div className="text">Nhập căn cước công dân</div>
                        <input
                            className="input"
                            type="text"
                            placeholder="Nhập căn cước công dân..."
                            value={userData.cic}
                            onChange={(event) => handleChange('cic', event.target.value)}
                        />

                        <div className="text">Nhập địa chỉ</div>
                        <input
                            className="input"
                            type="text"
                            placeholder="Nhập địa chỉ..."
                            value={userData.address}
                            onChange={(event) => handleChange('address', event.target.value)}
                        />
                    </>
                )}
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedRole}
                    label="Age"
                    onChange={handleChangeRole}
                >
                    <MenuItem value={10}>Đăng ký khách hàng</MenuItem>
                    <MenuItem value={20}>Đăng ký doanh nghiệp</MenuItem>
                </Select>

                <button
                    className={userData.email && userData.password ? 'button-1' : ''}
                    disabled={
                        userData.email &&
                        userData.password &&
                        userData.name &&
                        userData.phone &&
                        userData.email &&
                        (selectedRole === 10 || (selectedRole === 20 && userData.cic && userData.address))
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

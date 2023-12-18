import React, { useEffect, useState } from 'react';
import imgProfile from './shop1.png';
import getUnAuth from '~/API/get';

const EditProfile = () => {
    const s = JSON.parse(localStorage.getItem('User'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let response = await getUnAuth(`user/get-by-username/${s.un}`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                const date = new Date(response.dob);
                const d = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                response.dob = d;
                setUser(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="edit-profile">
            <div className="text-edit">
                <div className="label-input-container">
                    <label className="lable-edit">
                        <p>Email:</p>
                    </label>
                    <input className="input-edit" type="email" name="email" value={user.email} />
                </div>
                <div className="label-input-container">
                    <label className="lable-edit">
                        <p>Username:</p>
                    </label>
                    <input className="input-edit" type="text" name="username" value={user.username} />
                </div>
                <div className="label-input-container">
                    <label className="lable-edit">
                        <p>Họ và tên:</p>
                    </label>
                    <input className="input-edit" type="text" name="fullName" value={user.name} />
                </div>
                <div className="label-input-container">
                    <label className="lable-edit">
                        <p>Số điện thoại:</p>
                    </label>
                    <input className="input-edit" type="tel" name="phoneNumber" value={user.phone} />
                </div>
                {/* <div className="label-input-container">
                    <label className="lable-edit">
                        <p>Giới tính:</p>
                    </label>
                    <select className="gender" value={user.name}>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                </div> */}
                <div className="label-input-container">
                    <label className="lable-edit">
                        <p>Ngày sinh:</p>
                    </label>
                    <input className="input-edit" type="date" name="birthDate" value={user.dob} />
                </div>
                <button className="edit-button" type="submit">
                    Lưu
                </button>
            </div>
            <div className="img-edit">
                <img src={imgProfile} alt="" />
                <div className="text">Ảnh của bạn </div>
                <input className="input-img" type="file" id="profileImage" />
            </div>
        </div>
    );
};

export default EditProfile;

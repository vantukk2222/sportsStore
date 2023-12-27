import { useEffect, useState } from 'react';
import getUnAuth from '~/API/get';
import imgProfile from './shop1.png';

const EditProfile = () => {
    const s = JSON.parse(localStorage.getItem('User'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({});
    const [editedUser, setEditedUser] = useState({});

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
                setEditedUser(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            setLoading(true);
            const response = await saveChangesApiCall(editedUser);
            if (!response) {
                throw new Error('Failed to save changes');
            }
            setUser(editedUser);
            console.log('Changes saved successfully:', editedUser);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const saveChangesApiCall = async (userData) => {};

    return (
        <div className="edit-profile">
            <div className="text-edit">
                <div className="label-input-container">
                    <label className="lable-edit">
                        <p>Email:</p>
                    </label>
                    <input
                        className="input-edit"
                        type="email"
                        name="email"
                        value={editedUser.email || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="label-input-container">
                    <label className="lable-edit">
                        <p>Username:</p>
                    </label>
                    <input
                        className="input-edit"
                        type="text"
                        name="username"
                        value={editedUser.username || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="label-input-container">
                    <label className="lable-edit">
                        <p>Họ và tên:</p>
                    </label>
                    <input
                        className="input-edit"
                        type="text"
                        name="fullName"
                        value={editedUser.fullName || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="label-input-container">
                    <label className="lable-edit">
                        <p>Số điện thoại:</p>
                    </label>
                    <input
                        className="input-edit"
                        type="tel"
                        name="phoneNumber"
                        value={editedUser.phoneNumber || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="label-input-container">
                    <label className="lable-edit">
                        <p>Ngày sinh:</p>
                    </label>
                    <input
                        className="input-edit"
                        type="date"
                        name="birthDate"
                        value={editedUser.birthDate || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <button className="edit-button" type="button" onClick={handleSaveChanges}>
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

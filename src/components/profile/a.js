import { useEffect, useState } from 'react';
import getUnAuth from '~/API/get';
import { putUser } from '~/API/putUser';
import imgprofile from './shop1.png';
const EditProfile = () => {
    const s = JSON.parse(localStorage.getItem('User'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState([]);
    const [editedUser, setEditedUser] = useState({
        name: '',
        email: '',
        dob: '',
        phone: '',
        cic: '',
        address: '',
        image_url: '',
    });

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
        let updatedValue = value;

        setEditedUser({ ...editedUser, [name]: updatedValue });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/drkqkovpr/image/upload';
        const CLOUDINARY_UPLOAD_PRESET = 'qxvropzd';

        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setEditedUser({ ...editedUser, image_url: data.secure_url });
               
            } else {
                console.error('Error uploading image to Cloudinary');
            }
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const authToken = JSON.parse(localStorage.getItem('authToken'));
            putUser(s.id, editedUser, authToken);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const validateFormData = () => {
        if (!editedUser.email || !editedUser.phone) {
            return false;
        }
        return true;
    };

    return (
        <div className="edit-profile">
            <div className="text-edit">
                <div className="label-input-container">
                    <label className="lable-edit">
                        <p>Họ và tên:</p>
                    </label>
                    <input
                        className="input-edit"
                        type="text"
                        name="fullName"
                        value={editedUser.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="label-input-container">
                    <label className="lable-edit">
                        <p>Email:</p>
                    </label>
                    <input
                        className="input-edit"
                        type="email"
                        name="email"
                        value={editedUser.email}
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
                        name="dob"
                        value={editedUser.dob}
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
                        name="phone"
                        value={editedUser.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="label-input-container">
                    <label className="lable-edit">
                        <p>Căn cứ:</p>
                    </label>
                    <input
                        className="input-edit"
                        type="tel"
                        name="phone"
                        value={editedUser.cic}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="label-input-container">
                    <label className="lable-edit">
                        <p>Địa chỉ:</p>
                    </label>
                    <input
                        className="input-edit"
                        type="text"
                        name="address"
                        value={editedUser.address}
                        onChange={handleInputChange}
                    />
                </div>

                <button className="edit-button" type="button" onClick={handleSave}>
                    Lưu
                </button>
            </div>
            <div className="img-edit">
                <img src={imgprofile} alt="" />{' '}
                {/* 
                <img src={editedUser.image_url || 'default_image_url'} alt="" />{' '}
                <div className="text">Ảnh của bạn </div>
                <input className="input-img" type="file" id="profileImage" onChange={handleFileChange} /> */}
            </div>
        </div>
    );
};

export default EditProfile;

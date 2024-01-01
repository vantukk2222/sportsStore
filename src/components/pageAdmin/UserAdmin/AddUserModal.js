import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUserModal = ({ onClose, onSaveUser }) => {
    const navigate = useNavigate();

    const [newUser, setNewUser] = useState({
        username: '',
        img: '',
        email: '',
        name: '',
        password: '',
        cccd: '',
        address: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const input = e.target;
        const file = input.files[0];

        if (file) {
            uploadFileToCloudinary(file)
                .then((cloudinaryUrl) => {
                    setNewUser((prevUser) => ({
                        ...prevUser,
                        img: cloudinaryUrl,
                    }));
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                });
        } else {
            setNewUser((prevUser) => ({
                ...prevUser,
                img: input.value,
            }));
        }
    };

    const handleSaveUser = () => {
        onSaveUser(newUser);
        onClose();
    };

    const uploadFileToCloudinary = (file) => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'qxvropzd');

            fetch('https://api.cloudinary.com/v1_1/drkqkovpr/image/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.secure_url) {
                        resolve(data.secure_url);
                    } else {
                        reject(new Error('Image upload failed'));
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modalnewproduct">
                <span className="close" onClick={onClose}>
                    &times;
                </span>

                <h2>Thêm người dùng</h2>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" value={newUser.username} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Hình ảnh:</label>
                    <input type="file" name="img" onChange={handleImageChange} />
                    {newUser.img && <img src={newUser.img} alt="Selected Image" className="selected-image" />}
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" name="email" value={newUser.email} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Họ và tên:</label>
                    <input type="text" name="name" value={newUser.name} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>CCCD:</label>
                    <input type="text" name="cccd" value={newUser.cccd} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Địa chỉ:</label>
                    <input type="text" name="address" value={newUser.address} onChange={handleInputChange} />
                </div>

                <div className="modal-buttons">
                    <button onClick={handleSaveUser}>Thêm</button>
                    <button onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;

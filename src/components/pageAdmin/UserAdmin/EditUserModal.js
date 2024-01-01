import { useState } from 'react';

const EditUserModal = ({ onClose, onSaveUser, userToEdit }) => {
    const [editedUser, setEditedUser] = useState({ ...userToEdit });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
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
                    setEditedUser((prevUser) => ({
                        ...prevUser,
                        img: cloudinaryUrl,
                    }));
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                });
        } else {
            setEditedUser((prevUser) => ({
                ...prevUser,
                img: input.value,
            }));
        }
    };

    const handleSaveEditedUser = () => {
        onSaveUser(editedUser);
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

                <h2>Chỉnh sửa người dùng</h2>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" value={editedUser.username} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Hình ảnh:</label>
                    <input type="file" name="img" onChange={handleImageChange} />
                    {editedUser.img && <img src={editedUser.img} alt="Selected Image" className="selected-image" />}
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" name="email" value={editedUser.email} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Họ và tên:</label>
                    <input type="text" name="name" value={editedUser.name} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>CCCD:</label>
                    <input type="text" name="cccd" value={editedUser.cccd} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Địa chỉ:</label>
                    <input type="text" name="address" value={editedUser.address} onChange={handleInputChange} />
                </div>

                <div className="modal-buttons">
                    <button onClick={handleSaveEditedUser}>Lưu</button>
                    <button onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;

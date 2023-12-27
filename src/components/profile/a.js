import { useEffect, useState } from 'react';
import getUnAuth from '~/API/get';

const EditProfile = () => {
    const s = JSON.parse(localStorage.getItem('User'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState([]);
    const [editedUser, setEditedUser] = useState({
        email: '',
        username: '',
        name: '',
        phone: '',
        address: '',
        dob: '',
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
                console.log(response);
                const date = new Date(response.dob);
                const d = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                response.dob = d;
                setUser(response);
                setEditedUser(response); // Initialize editedUser with user data
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

        // Perform validation based on the input name
        switch (name) {
            case 'email':
                // Validate email format
                const emailRegex = /^\S+@\S+\.\S+$/;
                updatedValue = emailRegex.test(value) ? value : editedUser.email;
                break;
            case 'phone':
                // Validate phone number format
                const phoneRegex = /^\d+$/;
                updatedValue = phoneRegex.test(value) ? value : editedUser.phone;
                break;
            // Add more cases for other fields if needed
            default:
                break;
        }

        setEditedUser({ ...editedUser, [name]: updatedValue });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/drkqkovpr/image/upload';
        const CLOUDINARY_UPLOAD_PRESET = 'moox1jnq';

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
                console.log('check data ', data);
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
            if (!validateFormData()) {
                return;
            }

            const response = await updateUserData(editedUser);
            console.log('User data updated successfully:', response);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const updateUserData = async (userData) => {
        return { success: true };
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
                {/* ... (các input khác) */}
                <div className="label-input-container">
                    <label className="lable-edit">
                        <p>Ảnh đại diện:</p>
                    </label>
                    <input className="input-img" type="file" id="profileImage" onChange={handleFileChange} />
                </div>
                <button className="edit-button" type="button" onClick={handleSave}>
                    Lưu
                </button>
            </div>
        </div>
    );
};

export default EditProfile;

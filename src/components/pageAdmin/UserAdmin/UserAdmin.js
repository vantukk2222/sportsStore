import { useEffect, useState } from 'react';
import getUnAuth from '~/API/get';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';

const UserAdmin = () => {
    const [trackingInfo, setTrackingInfo] = useState([]);

    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getUnAuth(`user`);
                setTrackingInfo(response.content);
                console.log(response.content);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const handleOpenAddUserModal = () => {
        setIsAddUserModalOpen(true);
    };

    const handleCloseAddUserModal = () => {
        setIsAddUserModalOpen(false);
    };

    const handleOpenEditUserModal = (user) => {
        setUserToEdit(user);
        setIsEditUserModalOpen(true);
    };

    const handleCloseEditUserModal = () => {
        setUserToEdit(null);
        setIsEditUserModalOpen(false);
    };

    const handleSaveUser = (newUser) => {
        setTrackingInfo((prevTrackingInfo) => [...prevTrackingInfo, newUser]);
        handleCloseAddUserModal();
    };

    const handleSaveEditedUser = (editedUser) => {
        setTrackingInfo((prevTrackingInfo) =>
            prevTrackingInfo.map((user) => (user.id === editedUser.id ? editedUser : user)),
        );
        handleCloseEditUserModal();
    };

    const handleDeleteUser = (userId) => {
        setTrackingInfo((prevTrackingInfo) => prevTrackingInfo.filter((user) => user.id !== userId));
    };

    const handleAccUser = () => {};
    return (
        <div className="track-container">
            <h2>Quản lý User</h2>
            {/* <button className="" onClick={handleOpenAddUserModal}>
                Thêm người dùng
            </button> */}
            <div className="tracking-header">
                <div>Username</div>
                <div>Hình ảnh</div>
                <div className="adminheader">Email</div>
                <div>Họ và tên</div>
                <div>Phân quyền</div>
                <div>CCCD</div>
                <div>Địa chỉ</div>
                <div>Trạng thái</div>
                <div>Action</div>
            </div>

            {trackingInfo.map((user, index) => (
                <div className="tracking-info" key={index}>
                    <div>{user.username}</div>
                    <div>
                        <img src={user.img} alt={`User ${index + 1}`} />
                    </div>
                    <div className="adminheader">{user.email}</div>
                    <div>{user.name}</div>
                    <div>{user.roles}</div>

                    <div>{user.cic}</div>
                    <div>{user.address}</div>
                    <div>{user.state}</div>

                    <div>
                        <button className="" onClick={() => handleAccUser()}>
                            Xác nhận
                        </button>
                        {/* <button className="edit" onClick={() => handleOpenEditUserModal(user)}>
                            Edit
                        </button>
                        <button className="delete" onClick={() => handleDeleteUser(user.id)}>
                            Delete
                        </button> */}
                    </div>
                </div>
            ))}

            {isAddUserModalOpen && <AddUserModal onClose={handleCloseAddUserModal} onSaveUser={handleSaveUser} />}
            {isEditUserModalOpen && (
                <EditUserModal
                    onClose={handleCloseEditUserModal}
                    onSaveUser={handleSaveEditedUser}
                    userToEdit={userToEdit}
                />
            )}
        </div>
    );
};

export default UserAdmin;

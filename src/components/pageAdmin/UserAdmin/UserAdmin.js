import { useEffect, useState } from 'react';
import getUnAuth from '~/API/get';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import getUser from '~/API/Admin/getUser';
import { paste } from '@testing-library/user-event/dist/paste';
import postImage from '~/API/postImage';
import putChangeState from '~/API/Admin/putChangeState';
import { ToastContainer, toast } from 'react-toastify';

const UserAdmin = () => {
    const [trackingInfo, setTrackingInfo] = useState([]);

    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState('id');
    const [desc, setDesc] = useState(false);
    const [state,setState] = useState(1)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getUser(page,pageSize,sort,desc,state);
                let listAcc = response.content; 
                const filteredUsers = listAcc.filter(item => item?.roles[0] === 'ROLE_BUSINESS')
                setTrackingInfo(filteredUsers);
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
    }, [page,pageSize,sort,desc,state]);
    // useEffect(()=>{

    // },[trackingInfo])
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

    const handleAccUser = (user) => {
        const isConfirmed = window.confirm('Bạn có chắc muốn xác nhận?');

        // If the user clicks "OK" in the confirmation dialog
        if (isConfirmed) {
            const authToken = JSON.parse(localStorage.getItem('authToken'));
            console.log(authToken);
            putChangeState(user.id, 0, authToken)
            .then((status) => {
                console.log('API call successful. Status:', status);
                if (status === 202) {
                    toast("Xác nhận tài khoản thành công")
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error('API call failed:', error);
                // Handle the error as needed
            });
            
        } else {
            console.log('Hủy xác nhận');
        }
    };
    return (
        <div className="track-container">
            <h2>Quản lý User</h2>
            <ToastContainer />
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
                        <img src={user.image_url} alt={`User ${index + 1}`} />
                    </div>
                    <div className="adminheader">{user.email}</div>
                    <div>{user.name}</div>
                    <div>{user.roles}</div>

                    <div>{user.cic}</div>
                    <div>{user.address}</div>
                    <div>{user.state}</div>

                    <div>
                        <button className="" onClick={() => handleAccUser(user)}>
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

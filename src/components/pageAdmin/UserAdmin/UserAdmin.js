import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import getUser from '~/API/Admin/getUser';
import putChangeState from '~/API/Admin/putChangeState';
import searchUser from '~/API/Admin/searchUser';
import Pagination from '~/components/Shop/Pagination';

const UserAdmin = () => {
    const [trackingInfo, setTrackingInfo] = useState([]);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState('id');
    const [desc, setDesc] = useState(false);
    const [state, setState] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    function isInteger(value) {
        return typeof value === 'number' && isFinite(value) && (value | 0) === value;
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let response;

                if (searchTerm) {
                    response = await searchUser(searchTerm, page, pageSize, sort, desc, state);
                } else {
                    response = await getUser(page, pageSize, sort, desc, state);
                }
                if (!response.totalPage) {
                    //  console.log(response);
                    let totalPages = isInteger((response.totalPages * 10 - 2) / 10)
                        ? parseInt((response.totalPages * 10 - 2) / 10)
                        : parseInt((response.totalPages * 10 - 2) / 10) + 1;
                    setTotalPage(totalPages);
                }
                let listAcc = response.content;
                listAcc = listAcc.filter(
                    (item) => item?.roles[0] === 'ROLE_BUSINESS' || item?.roles[0] === 'ROLE_CUSTOMER',
                );

                setTrackingInfo(listAcc);
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
    }, [page, pageSize, sort, desc, state, searchTerm]);

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

        if (isConfirmed) {
            const authToken = JSON.parse(localStorage.getItem('authToken'));

            if (state === 1) {
                putChangeState(user.id, 0, authToken)
                    .then((status) => {
                        if (status === 202) {
                            toast('Xác nhận tài khoản thành công');
                            window.location.reload();
                        }
                    })
                    .catch((error) => {
                        console.error('API call failed:', error);
                    });
            } else {
                putChangeState(user.id, 1, authToken)
                    .then((status) => {
                        if (status === 202) {
                            toast('Khóa tài khoản thành công');
                            window.location.reload();
                        }
                    })
                    .catch((error) => {
                        console.error('API call failed:', error);
                    });
            }
        } else {
        }
    };

    return (
        <>
            <div className="track-container">
                <h2>Quản lý User</h2>
                <input
                    style={{ width: '400px' }}
                    type="text"
                    placeholder="Tìm kiếm "
                    value={searchTerm}
                    onChange={(e) => {
                        setTotalPage(0);
                        setPage(0);
                        setSearchTerm(e.target.value);
                    }}
                />
                <ToastContainer />
                {state === 1 ? (
                    <button
                        className=""
                        style={{ backgroundColor: 'red' }}
                        onClick={() => {
                            setTotalPage(0);
                            setPage(0);
                            setState(0);
                        }}
                    >
                        Khóa tài khoản
                    </button>
                ) : (
                    <button
                        className=""
                        onClick={() => {
                            setTotalPage(0);
                            setPage(0);
                            setState(1);
                        }}
                    >
                        Xác nhận tài khoản
                    </button>
                )}

                <div className="tracking-header" style={{ fontSize: '13px' }}>
                    <div style={{ width: '150px' }}>Username</div>
                    <div>Hình ảnh</div>
                    <div className="adminheader">Email</div>
                    <div style={{ width: '120px' }}>Họ và tên</div>
                    <div style={{ width: '130px' }}>Phân quyền</div>
                    <div>CCCD</div>
                    <div>Địa chỉ</div>
                    <div>Trạng thái</div>
                    <div>Action</div>
                </div>

                {trackingInfo.length > 0 ? (
                    trackingInfo.map((user, index) => (
                        <div className="tracking-info" key={index} style={{ fontSize: '13px' }}>
                            <div style={{ width: '150px' }}>{user.username}</div>
                            <div>
                                <img src={user.image_url} alt={`User ${index + 1}`} />
                            </div>
                            <div className="adminheader">{user.email}</div>
                            <div style={{ width: '120px' }}>{user.name}</div>
                            <div style={{ width: '130px' }}>{user.roles}</div>

                            <div>{user.cic}</div>
                            <div>{user.address}</div>
                            <div>{user.state === 1 ? 'Chưa xác nhận' : 'Đang hoạt động'}</div>

                            <div>
                                <button
                                    className=""
                                    style={{
                                        backgroundColor: state === 1 ? 'green' : 'red',
                                        color: 'white',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleAccUser(user)}
                                >
                                    {state === 1 ? 'Xác nhận' : 'Khóa'}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2>Không có người dùng phù hợp</h2>
                )}
                {totalPage > 1 && <Pagination currentPage={page} totalPages={totalPage} onPageChange={setPage} />}
            </div>
        </>
    );
};

export default UserAdmin;

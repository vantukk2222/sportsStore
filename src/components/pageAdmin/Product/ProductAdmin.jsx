import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import getProductInfor from '~/API/Admin/product/getProductInfor';
import putChangeStateProduct from '~/API/Admin/product/putChangeStateProduct';
import AddEventModal from './AddEventModalAdmin';
import AddProductModal from './AddProductModalAdmin';
import EditProductModal from './EditProductModalAdmin';

const ProductAdmin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);

    const [totalPage, setTotalPage] = useState(null)
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState('id');
    const [desc, setDesc] = useState(false);
    const [state, setState] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getProductInfor(page, pageSize, sort, desc, state);
                if (!totalPage) {
                    setTotalPage(response?.totalPages)
                }
                let listProduct = response.content;
                console.log(listProduct);
                // const filteredUsers = listAcc.filter(item => item?.roles[0] === 'ROLE_BUSINESS')
                setProducts(listProduct);
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
    }, [page, pageSize, sort, desc, state]);
    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleOpenEditModal = (index) => {
        setEditIndex(index);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveProduct = (editedProduct) => {
        const updatedProducts = [...products];
        updatedProducts[editIndex] = editedProduct;

        setProducts(updatedProducts);

        setEditIndex(null);
        handleCloseEditModal();
    };

    const handleConfirm = (product) => {
        const isConfirmed = window.confirm('Bạn có chắc muốn xác nhận?');
        if (isConfirmed) {
            const authToken = JSON.parse(localStorage.getItem('authToken'));
            console.log(authToken);
            putChangeStateProduct(product.id, 0, authToken)
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

    const handleCheckboxChange = (index) => {
        const updatedSelectedProducts = [...selectedProducts];
        updatedSelectedProducts[index] = !updatedSelectedProducts[index];
        setSelectedProducts(updatedSelectedProducts);
    };

    const isAnyCheckboxChecked = selectedProducts.some((isChecked) => isChecked);

    const handleEventButtonClick = () => {
        setIsAddEventModalOpen(true);
    };

    const handleCloseAddEventModal = () => {
        setIsAddEventModalOpen(false);
    };

    const handleSaveEvent = (eventName) => {
        console.log('Event Name:', eventName);
        setIsAddEventModalOpen(false);
    };

    return (
        <>
            <div className="track-container">
                <h2>Quản lý sản phẩm</h2>
                {/* <button type="button" onClick={handleOpenAddModal}>
                Thêm sản phẩm
            </button> */}
                <ToastContainer />
                {/* {isAnyCheckboxChecked && (
                <>
                    <button className="eventButton" onClick={handleEventButtonClick}>
                        Thêm sự kiện
                    </button>
                    <button className="eventButton">Xóa sự kiện</button>
                </>
            )} */}
                <div className="tracking-header">
                    <div className="divproductB">Tên sản phẩm</div>
                    <div className="divproductB">Hình ảnh</div>
                    <div className="divproductB">Mô tả sản phẩm</div>
                    <div className="divproductC">Sizes-Giá tiền-Số lượng</div>
                    <div className="divproductB">
                        <p>Phân loại</p>
                    </div>
                    <div className="divproductB">Thao tác</div>
                </div>

                {products.map((product, index) => (
                    <div className="tracking-info" key={index}>
                        {/* <div className="divproductB">
                        <input
                            type="checkbox"
                            checked={selectedProducts[index]}
                            onChange={() => handleCheckboxChange(index)}
                        />
                    </div> */}

                        <div className="divproductB">{product?.name}</div>
                        <div className="divproductB">
                            <img
                                src={product.imageSet?.find((e) => e.is_main === true)?.url}
                                alt={`Product ${index + 1}`}
                            />
                        </div>
                        <div className="divproductB">{product.detail || 'Không có'}</div>

                        <div className="divproductC">
                            {product?.productSet.map((sizeInfo, i) => (
                                <div key={i}>
                                    <span>{sizeInfo?.size}-</span>
                                    <span>{sizeInfo?.price}đ-</span>
                                    <span>{sizeInfo?.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="divproductB">{product.categorySet.reduce((a, e) => a + `${e.name},`, '')}</div>
                        {/* <div className="divproductB">{product.discount}%</div> */}

                        <div className="divproductB">
                            <button className="editproduct" onClick={() => handleConfirm(product)}>
                                Xác nhận
                            </button>
                        </div>
                    </div>
                ))}

                {isAddModalOpen && <AddProductModal onClose={handleCloseAddModal} onSave={handleSaveProduct} />}
                {isEditModalOpen && (
                    <EditProductModal
                        product={products[editIndex]}
                        onClose={handleCloseEditModal}
                        onSave={handleSaveProduct}
                    />
                )}
                {isAddEventModalOpen && <AddEventModal onClose={handleCloseAddEventModal} onSaveEvent={handleSaveEvent} />}
            </div>
            {totalPage && <Pagination className='pagination'
                onChange={(e, value) => { setPage(value - 1) }}
                count={totalPage}
                defaultPage={page + 1}
                variant="outlined" color="secondary" />}
        </>
    );
};

export default ProductAdmin;

import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import SearchProductAdmin from '~/API/Admin/product/SearchProductAdmin';
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

    const [totalPage, setTotalPage] = useState(null);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState('id');
    const [desc, setDesc] = useState(false);
    const [state, setState] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let response;

                if (searchTerm) {
                    response = await SearchProductAdmin(searchTerm, page, pageSize, sort, desc, state);
                    if (!totalPage) {
                        setTotalPage(response?.totalPages);
                    }
                } else {
                    response = await getProductInfor(page, pageSize, sort, desc, state);
                    if (!totalPage) {
                        setTotalPage(response?.totalPages);
                    }
                }

                let listProduct = response.content;
                if(state === 0){
                    listProduct = listProduct.filter((item)=>item.number_dislike>3);

                }
               
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
    }, [page, pageSize, sort, desc, state, searchTerm, totalPage]);

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
        let isConfirmed;
        state === 1 ? isConfirmed = window.confirm('Bạn có chắc muốn mở sản phẩm?') : 
        isConfirmed = window.confirm('Bạn có chắc muốn khóa sản phẩm?');
        if (isConfirmed) {
            const authToken = JSON.parse(localStorage.getItem('authToken'));
          
            if(state === 1){
                putChangeStateProduct(product.id, 0, authToken)
                .then((status) => {
                 
                    if (status === 202) {
                        toast('Mở sản phẩm thành công');
                        const updatedProducts = products.map((p) => (p.id === product.id ? { ...p, state: 0 } : p));
                        setProducts(updatedProducts);
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    console.error('API call failed:', error);
                });
            }else{
               
                putChangeStateProduct(product.id, 1, authToken)
                .then((status) => {
                 
                    if (status === 202) {
                        toast('Khóa sản phẩm thành công');
                        const updatedProducts = products.map((p) => (p.id === product.id ? { ...p, state: 1 } : p));
                        setProducts(updatedProducts);
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
       
        setIsAddEventModalOpen(false);
    };

    return (
        <>
            <div className="track-container">
                <h2>Quản lý sản phẩm</h2>
                <input
                    style={{ width: '400px' }}
                    type="text"
                    placeholder="Tìm kiếm sản phẩm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                 {state === 1 ? (
                    <button className="" style={{ backgroundColor: 'red' }} onClick={() => setState(0)}>
                        Khóa sản phẩm
                    </button>
                ) : (
                    <button className="" onClick={() => setState(1)}>
                        Mở khóa sản phẩm
                    </button>
                )}
                <ToastContainer />
                <div className="trackingheader">
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
                    <div className="trackinginfo" key={index}>
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

                        <div className="divproductB">
                            <button className="editproduct" onClick={() => handleConfirm(product)}>
                            {state === 1 ? 'Mở' : 'Khóa'}
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
                {isAddEventModalOpen && (
                    <AddEventModal onClose={handleCloseAddEventModal} onSaveEvent={handleSaveEvent} />
                )}
            </div>
            {totalPage && (
                <Pagination
                    className="pagination"
                    onChange={(e, value) => {
                        setPage(value - 1);
                    }}
                    count={totalPage}
                    defaultPage={page + 1}
                    variant="outlined"
                    color="secondary"
                />
            )}
        </>
    );
};

export default ProductAdmin;

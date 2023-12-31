// Import useState and the modal components
import { useEffect, useState } from 'react';
import getUnAuth from '~/API/get';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

const BProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

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
        setEditIndex(null);
        setIsEditModalOpen(false);
    };

    const handleSaveProduct = (editedProduct) => {
        setEditIndex(null);
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleDeleteProduct = (index) => {};
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const user = JSON.parse(localStorage.getItem('User'));
                const response = await getUnAuth(`product-information/find-by-business/${user.id}`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                setProducts(response.content);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    console.log(products[editIndex]);
    return (
        <div className="track-container">
            <h2>Quản lý sản phẩm</h2>
            <button type="button" onClick={handleOpenAddModal}>
                Thêm sản phẩm
            </button>
            <div className="tracking-header">
                <div>Tên sản phẩm</div>
                <div>Hình ảnh</div>
                <div>Mô tả sản phẩm</div>
                <div>SIZE</div>
                <div>Phân loại</div>
                <div>Giá tiền</div>
                <div>Mã giảm giá</div>
                <div>Thao tác</div>
            </div>

            {products.map((product, index) => (
                <div className="tracking-info" key={index}>
                    <div>{product.name}</div>
                    <div>
                        <img src={product.imageSet.find((e) => e.is_main === true).url} alt={`Product ${index + 1}`} />
                    </div>
                    <div>{product.detail ? product.detail : 'Không có'}</div>

                    <div>
                        {product.productSet[0].size
                            ? product.productSet.reduce((a, e) => a + `${e.size},`, '')
                            : 'Không có'}
                    </div>
                    <div>{product.categorySet.reduce((a, e) => a + `${e.name},`, '')}</div>
                    <div>{product.price_min}đ</div>
                    <div>{product.sale ? product.sale : 'Không có'}</div>

                    <div>
                        <button className="editproduct" onClick={() => handleOpenEditModal(index)}>
                            Sửa
                        </button>
                        <button className="deleteproduct" onClick={() => handleDeleteProduct(index)}>
                            Xóa
                        </button>
                        <button className="unproduct">Ẩn</button>
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
        </div>
    );
};

export default BProduct;

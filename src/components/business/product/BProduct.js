import { useEffect, useState } from 'react';
import getUnAuth from '~/API/get';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

const BProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);

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
        // Assuming you want to update the product in the products array
        const updatedProducts = [...products];
        updatedProducts[editIndex] = editedProduct;

        setProducts(updatedProducts);

        setEditIndex(null);
        handleCloseEditModal();
    };

    const handleDeleteProduct = (index) => {};

    const handleCheckboxChange = (index) => {
        const updatedSelectedProducts = [...selectedProducts];
        updatedSelectedProducts[index] = !updatedSelectedProducts[index];
        setSelectedProducts(updatedSelectedProducts);
    };

    const isAnyCheckboxChecked = selectedProducts.some((isChecked) => isChecked);

    const handleEventButtonClick = () => {
        console.log('Performing event action for selected products:', selectedProducts);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const user = JSON.parse(localStorage.getItem('User'));
                const response = await getUnAuth(`product-information/find-by-business/${user.id}`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                setSelectedProducts(Array(response.content.length).fill(false));
                setProducts(response.content);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="track-container">
            <h2>Quản lý sản phẩm</h2>
            <button type="button" onClick={handleOpenAddModal}>
                Thêm sản phẩm
            </button>
            {isAnyCheckboxChecked && (
                <button className="eventButton" onClick={handleEventButtonClick}>
                    Thêm sự kiện
                </button>
            )}
            <div className="tracking-header">
                <div className="divproductB"></div>
                <div className="divproductB">Tên sản phẩm</div>
                <div className="divproductB">Hình ảnh</div>
                <div className="divproductB">Mô tả sản phẩm</div>
                <div className="divproductC">Sizes-Giá tiền-Số lượng</div>
                <div className="divproductB">
                    <p>Phân loại</p>
                </div>
                <div className="divproductB">Giảm giá</div>
                <div className="divproductB">Thao tác</div>
            </div>

            {products.map((product, index) => (
                <div className="tracking-info" key={index}>
                    <div className="divproductB">
                        <input
                            type="checkbox"
                            checked={selectedProducts[index]}
                            onChange={() => handleCheckboxChange(index)}
                        />
                    </div>

                    <div className="divproductB">{product.name}</div>
                    <div className="divproductB">
                        <img
                            src={product.imageSet?.find((e) => e.is_main === true)?.url}
                            alt={`Product ${index + 1}`}
                        />
                    </div>
                    <div className="divproductB">{product.detail || 'Không có'}</div>

                    <div className="divproductC">
                        {product.productSet.map((sizeInfo, i) => (
                            <div key={i}>
                                <span>{sizeInfo.size}-</span>
                                <span>{sizeInfo.price}đ-</span>
                                <span>{sizeInfo.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <div className="divproductB">{product.categorySet.reduce((a, e) => a + `${e.name},`, '')}</div>
                    <div className="divproductB">{product.discount}%</div>

                    <div className="divproductB">
                        <button className="editproduct" onClick={() => handleOpenEditModal(index)}>
                            Sửa
                        </button>
                        <button
                            className="deleteproduct"
                            onClick={() => handleDeleteProduct(index)}
                            disabled={!selectedProducts[index]}
                        >
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

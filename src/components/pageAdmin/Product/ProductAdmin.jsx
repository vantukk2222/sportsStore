import { useState } from 'react';
import AddEventModal from './AddEventModalAdmin';
import AddProductModal from './AddProductModalAdmin';
import EditProductModal from './EditProductModalAdmin';

const ProductAdmin = () => {
    const [products, setProducts] = useState([
        {
            name: 'Sản phẩm 1',
            imageSet: [
                { url: 'image1_1.jpg', is_main: true },
                { url: 'image1_2.jpg', is_main: false },
            ],
            detail: 'Mô tả sản phẩm 1',
            productSet: [
                { size: 'S', price: 100000, quantity: 10 },
                { size: 'M', price: 120000, quantity: 15 },
                { size: 'L', price: 150000, quantity: 8 },
            ],
            categorySet: [{ name: 'Loại 1' }, { name: 'Loại 2' }],
            discount: 10,
        },
        {
            name: 'Sản phẩm 2',
            imageSet: [
                { url: 'image2_1.jpg', is_main: true },
                { url: 'image2_2.jpg', is_main: false },
            ],
            detail: 'Mô tả sản phẩm 2',
            productSet: [
                { size: 'S', price: 80000, quantity: 20 },
                { size: 'M', price: 100000, quantity: 12 },
                { size: 'L', price: 130000, quantity: 5 },
            ],
            categorySet: [{ name: 'Loại 2' }, { name: 'Loại 3' }],
            discount: 5,
        },
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);

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

    const handleDeleteProduct = (index) => {};

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
        <div className="track-container">
            <h2>Quản lý sản phẩm</h2>
            <button type="button" onClick={handleOpenAddModal}>
                Thêm sản phẩm
            </button>
            {isAnyCheckboxChecked && (
                <>
                    <button className="eventButton" onClick={handleEventButtonClick}>
                        Thêm sự kiện
                    </button>
                    <button className="eventButton">Xóa sự kiện</button>
                </>
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
    );
};

export default ProductAdmin;

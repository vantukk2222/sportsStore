// Import useState and the modal components
import { useState } from 'react';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

const BProduct = () => {
    const [trackingInfo, setTrackingInfo] = useState([
        {
            name_product: 'giày',
            set_img: ['track1.png', 'track2.png', 'track3.png', 'track4.png'],
            total: '30,000 VND',
            category: 'giày',
            sale: '30%',
            size: 'S',
            detail: 'giày đẹp',
        },
        {
            name_product: 'áo',
            set_img: ['track5.png', 'track6.png', 'track7.png', 'track8.png'],
            total: '50,000 VND',
            category: 'áo',
            sale: '30%',
            size: 'S',
            detail: 'áo đẹp',
        },
    ]);

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
        const updatedTrackingInfo = [...trackingInfo];
        if (editIndex !== null) {
            updatedTrackingInfo[editIndex] = editedProduct;
        } else {
            updatedTrackingInfo.push(editedProduct);
        }
        setTrackingInfo(updatedTrackingInfo);
        setEditIndex(null);
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleDeleteProduct = (index) => {
        const updatedTrackingInfo = [...trackingInfo];
        updatedTrackingInfo.splice(index, 1);
        setTrackingInfo(updatedTrackingInfo);
    };

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

            {trackingInfo.map((product, index) => (
                <div className="tracking-info" key={index}>
                    <div>{product.name_product}</div>
                    <div>
                        <img src={product.set_img[0]} alt={`Product ${index + 1}`} />
                    </div>
                    <div>{product.detail}</div>

                    <div>{product.size}</div>
                    <div>{product.category}</div>
                    <div>{product.total}</div>
                    <div>{product.sale}</div>

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
                    product={editIndex !== null ? trackingInfo[editIndex] : null}
                    onClose={handleCloseEditModal}
                    onSave={handleSaveProduct}
                />
            )}
        </div>
    );
};

export default BProduct;

// EditProductModal.js
import { useEffect, useState } from 'react';

const EditProductModal = ({ product, onClose, onSave }) => {
    const [editedProduct, setEditedProduct] = useState({
        name_product: '',
        img: '',
        total: '',
        category: '',
        status: '',
        size: '',
    });

    useEffect(() => {
        if (product) {
            setEditedProduct({ ...product });
        }
    }, [product]);

    const handleSaveProduct = () => {
        onSave(editedProduct);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    return (
        <div className="modal-overlay">
            <div className="modalnewproduct">
                <h2>Chỉnh sửa sản phẩm</h2>

                <div className="form-group">
                    <label htmlFor="name_product">Tên sản phẩm:</label>
                    <input
                        type="text"
                        id="name_product"
                        name="name_product"
                        value={editedProduct.name_product}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="img">Hình ảnh:</label>
                    <input type="text" id="img" name="img" value={editedProduct.img} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="total">Giá tiền:</label>
                    <input
                        type="text"
                        id="total"
                        name="total"
                        value={editedProduct.total}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Danh mục:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={editedProduct.category}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Mô tả sản phẩm:</label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={editedProduct.status}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="size">SIZE:</label>
                    <input type="text" id="size" name="size" value={editedProduct.size} onChange={handleInputChange} />
                </div>

                <div className="modal-buttons">
                    <button onClick={handleSaveProduct}>Lưu</button>
                    <button onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;

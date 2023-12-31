// EditProductModal.js
import { useEffect, useState } from 'react';

const EditProductModal = ({ product, onClose, onSave }) => {
    const [editedProduct, setEditedProduct] = useState({
        name_product: '',
        img: '',
        total: '',
        category: '',
        sale: '',
        size: '',
        detail: '',
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedProduct({ ...editedProduct, img: reader.result });
            };
            reader.readAsDataURL(file);
        }
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
                    <input type="file" accept="image/*" id="img" name="img" onChange={handleImageChange} />
                    {editedProduct.img && (
                        <img src={editedProduct.img} alt="Product" style={{ maxWidth: '100%', marginTop: '10px' }} />
                    )}
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
                    <label htmlFor="sale">Mã giảm giá:</label>
                    <input type="text" id="sale" name="sale" value={editedProduct.sale} onChange={handleInputChange} />
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
                    <label htmlFor="detail">Mô tả sản phẩm:</label>
                    <input
                        type="text"
                        id="detail"
                        name="detail"
                        value={editedProduct.detail}
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

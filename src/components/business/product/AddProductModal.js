import { useState } from 'react';

const AddProductModal = ({ onClose }) => {
    const [newProduct, setNewProduct] = useState({
        name_product: '',
        img: '',
        total: '',
        category: '',
        status: '',
        size: '',
    });

    const handleAddProduct = () => {
        onClose();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProduct({ ...newProduct, img: URL.createObjectURL(file) });
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modalnewproduct">
                <h2>Thêm sản phẩm</h2>

                <div className="form-group">
                    <label htmlFor="name_product">Tên sản phẩm:</label>
                    <input
                        type="text"
                        id="name_product"
                        name="name_product"
                        value={newProduct.name_product}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="img">Hình ảnh:</label>
                    <input type="file" id="img" name="img" accept="image/*" onChange={handleImageChange} />
                    {newProduct.img && <img src={newProduct.img} alt="Preview" style={{ maxWidth: '100%' }} />}
                </div>

                <div className="form-group">
                    <label htmlFor="total">Giá tiền:</label>
                    <input type="text" id="total" name="total" value={newProduct.total} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Danh mục:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Trạng thái:</label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={newProduct.status}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="size">Kích thước:</label>
                    <input type="text" id="size" name="size" value={newProduct.size} onChange={handleInputChange} />
                </div>

                <div className="modal-buttons">
                    <button onClick={handleAddProduct}>Thêm</button>
                    <button onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;

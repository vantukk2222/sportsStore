import { useState } from 'react';

const AddProductModal = ({ onClose }) => {
    const [newProduct, setNewProduct] = useState({
        name_product: '',
        set_img: [],
        total: '',
        category: '',
        sale: '',
        size: '',
        detail: '',
    });

    const handleAddProduct = () => {
        onClose();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = e.target.files;

        const newImages = [];
        for (let i = 0; i < files.length; i++) {
            newImages.push(URL.createObjectURL(files[i]));
        }

        setNewProduct((prevProduct) => ({
            ...prevProduct,
            set_img: [...prevProduct.set_img, ...newImages],
        }));
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

                <div className="formgroupimg">
                    <div className="form-group">
                        <label htmlFor="img">Hình ảnh:</label>
                        <input type="file" id="img" name="img" accept="image/*" onChange={handleImageChange} multiple />
                    </div>
                    {newProduct.set_img.length > 0 && (
                        <div className="formimggroup">
                            {newProduct.set_img.map((image, index) => (
                                <img
                                    key={index}
                                    className="imgaddproduct"
                                    src={image}
                                    alt={`Preview ${index + 1}`}
                                    style={{ maxWidth: '100%' }}
                                />
                            ))}
                        </div>
                    )}
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
                    <label htmlFor="detail">Mô tả:</label>
                    <input
                        type="text"
                        id="detail"
                        name="detail"
                        value={newProduct.detail}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sale">Mã giảm giá:</label>
                    <input type="text" id="sale" name="sale" value={newProduct.sale} onChange={handleInputChange} />
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

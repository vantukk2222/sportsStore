import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const EditProductModal = ({ product, onClose, onSave }) => {
    const [editedProduct, setEditedProduct] = useState({
        name: '',
        imageSet: [],
        detail: '',
        size: '',
        categorySet: [],
        price_min: '',
        sale: '',
    });

    useEffect(() => {
        if (product) {
            // Map các thuộc tính từ product sang editedProduct
            const { name, imageSet, detail, size, categorySet, price_min, sale } = product;
            setEditedProduct({
                name,
                imageSet: [...imageSet],
                detail,
                size,
                categorySet: [...categorySet],
                price_min,
                sale,
            });
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
        const files = e.target.files;
        if (files) {
            const imagesArray = Array.from(files).map((file) => URL.createObjectURL(file));
            setEditedProduct((prevProduct) => ({
                ...prevProduct,
                imageSet: [...imagesArray],
            }));
        }
    };

    const handleRemoveImage = (index) => {
        setEditedProduct((prevProduct) => {
            const updatedImages = [...prevProduct.imageSet];
            updatedImages.splice(index, 1);
            return {
                ...prevProduct,
                imageSet: updatedImages,
            };
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modalnewproduct">
                <h2>Chỉnh sửa sản phẩm</h2>

                <div className="form-group">
                    <label htmlFor="name">Tên sản phẩm:</label>
                    <input type="text" id="name" name="name" value={editedProduct.name} onChange={handleInputChange} />
                </div>

                <div className="formgroupimg">
                    <div className="form-group">
                        <label htmlFor="img">Hình ảnh:</label>
                        <input type="file" accept="image/*" id="img" name="img" onChange={handleImageChange} multiple />
                    </div>
                    {editedProduct.imageSet.length > 0 && (
                        <div className="formimggroup">
                            {editedProduct.imageSet.map((image, index) => (
                                <div key={index} style={{ position: 'relative', marginBottom: '10px' }}>
                                    <img
                                        className="imgaddproduct"
                                        src={image}
                                        alt={`Preview ${index + 1}`}
                                        style={{ maxWidth: '100%', marginTop: '10px' }}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={() => handleRemoveImage(index)}
                                        style={{
                                            position: 'absolute',
                                            top: '12px',
                                            right: '5px',
                                            cursor: 'pointer',
                                            color: 'black',
                                            fontSize: '18px',
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
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

                <div className="form-group">
                    <label htmlFor="category">Danh mục:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={editedProduct.categorySet.reduce((a, e) => a + `${e.name},`, '')}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price_min">Giá tiền:</label>
                    <input
                        type="text"
                        id="price_min"
                        name="price_min"
                        value={editedProduct.price_min}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sale">Mã giảm giá:</label>
                    <input type="text" id="sale" name="sale" value={editedProduct.sale} onChange={handleInputChange} />
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

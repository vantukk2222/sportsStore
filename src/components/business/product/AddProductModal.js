import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const AddProductModal = ({ onClose }) => {
    const [newProduct, setNewProduct] = useState({
        name_product: '',
        set_img: [],
        priceSizePairs: [{ size: '', price: '', quantity: '' }],
        category: '',
        sale: '',
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
        const newImages = Array.from(files).map((file) => URL.createObjectURL(file));

        setNewProduct((prevProduct) => ({
            ...prevProduct,
            set_img: [...prevProduct.set_img, ...newImages],
        }));
    };

    const handleAddPriceSizePair = () => {
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            priceSizePairs: [...prevProduct.priceSizePairs, { size: '', price: '', quantity: '' }],
        }));
    };

    const handlePriceSizeChange = (index, field, value) => {
        const updatedPairs = [...newProduct.priceSizePairs];
        updatedPairs[index][field] = value;

        setNewProduct((prevProduct) => ({
            ...prevProduct,
            priceSizePairs: updatedPairs,
        }));
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...newProduct.set_img];
        updatedImages.splice(index, 1);
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            set_img: updatedImages,
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
                                <div key={index} style={{ position: 'relative', marginBottom: '10px' }}>
                                    <img
                                        className="imgaddproduct"
                                        src={image}
                                        alt={`Preview ${index + 1}`}
                                        style={{ maxWidth: '100%' }}
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

                <div className="">
                    {newProduct.priceSizePairs.map((pair, index) => (
                        <div className="form-group" key={index}>
                            <input
                                className="inputform"
                                type="text"
                                style={{ marginLeft: '150px' }}
                                placeholder="Size"
                                value={pair.size}
                                onChange={(e) => handlePriceSizeChange(index, 'size', e.target.value)}
                            />
                            <input
                                className="inputform"
                                type="text"
                                style={{ marginLeft: '20px' }}
                                placeholder="Giá tiền"
                                value={pair.price}
                                onChange={(e) => handlePriceSizeChange(index, 'price', e.target.value)}
                            />
                            <input
                                className="inputform"
                                type="text"
                                style={{ marginLeft: '20px' }}
                                placeholder="Số lượng"
                                value={pair.quantity}
                                onChange={(e) => handlePriceSizeChange(index, 'quantity', e.target.value)}
                            />
                        </div>
                    ))}
                </div>
                <button onClick={handleAddPriceSizePair} style={{ marginLeft: '20px', marginBottom: '20px' }}>
                    +
                </button>

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

                {/* <div className="form-group">
                    <label htmlFor="sale">Mã giảm giá:</label>
                    <input type="text" id="sale" name="sale" value={newProduct.sale} onChange={handleInputChange} />
                </div> */}

                <div className="modal-buttons">
                    <button onClick={handleAddProduct}>Thêm</button>
                    <button onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;

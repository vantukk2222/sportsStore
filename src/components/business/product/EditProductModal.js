import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const EditProductModal = ({ product, onClose, onSave }) => {
    console.log(product);
    const [editedProduct, setEditedProduct] = useState({
        name: product.name,
        id_business: product.business.id,
        imageSet: product.imageSet,
        detail: product.detail,
        attribute: product.attribute,
        priceSizePairs: product.productSet.map((sizeInfo) => ({
            id: sizeInfo.id,
            size: sizeInfo.size,
            price: sizeInfo.price,
            quantity: sizeInfo.quantity,
        })),
        categorySet: product.categorySet,
        // sale: '',
    });

    useEffect(() => {}, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleImageChange = async (e) => {
        const files = e.target.files;
        // console.log(files);

        if (files) {
            try {
                const imagesArray = await Promise.all(
                    Array.from(files).map(async (file) => {
                        const imageUrl = await uploadFileToCloudinary(file);
                        return { id: null, url: imageUrl };
                    }),
                );

                setEditedProduct((prevProduct) => ({
                    ...prevProduct,
                    imageSet: [...prevProduct.imageSet, ...imagesArray],
                }));
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };
    const uploadFileToCloudinary = (file) => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'qxvropzd');

            fetch('https://api.cloudinary.com/v1_1/drkqkovpr/image/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.secure_url) {
                        resolve(data.secure_url);
                    } else {
                        reject(new Error('Image upload failed'));
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
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

    const handleAddPriceSizePair = () => {
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            priceSizePairs: [...prevProduct.priceSizePairs, { size: '', price: '', quantity: '' }],
        }));
    };

    const handlePriceSizeChange = (index, field, value) => {
        const updatedPairs = [...editedProduct.priceSizePairs];
        updatedPairs[index][field] = value;

        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            priceSizePairs: updatedPairs,
        }));
    };
    console.log(editedProduct);
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
                                        src={image.url}
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

                <div className="">
                    {editedProduct.priceSizePairs.map((pair, index) => (
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
                                placeholder="Giá tiền"
                                value={pair.price}
                                onChange={(e) => handlePriceSizeChange(index, 'price', e.target.value)}
                            />
                            <input
                                className="inputform"
                                type="text"
                                placeholder="Số lượng"
                                value={pair.quantity}
                                onChange={(e) => handlePriceSizeChange(index, 'quantity', e.target.value)}
                            />
                        </div>
                    ))}
                </div>
                <button onClick={handleAddPriceSizePair} style={{ marginLeft: '150px', marginBottom: '20px' }}>
                    +
                </button>

                <div className="form-group">
                    <label htmlFor="detail">Mô tả sản phẩm:</label>
                    <input
                        type="text"
                        id="detail"
                        name="detail"
                        value={editedProduct.detail || ''}
                        onChange={handleInputChange}
                    />
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

                {/* <div className="form-group">
                    <label htmlFor="sale">Mã giảm giá:</label>
                    <input type="text" id="sale" name="sale" value={editedProduct.sale} onChange={handleInputChange} />
                </div> */}

                <div className="modal-buttons">
                    <button onClick={() => onSave(product.id, editedProduct)}>Lưu</button>
                    <button onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;

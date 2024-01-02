import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const AddProductModal = ({ onClose }) => {
    const [newProduct, setNewProduct] = useState({
        id: null,
        name: '',
        id_business: null,
        imageSet: [],
        detail: '',
        attribute: '',
        priceSizePairs: [{ id: null, size: '', price: '', quantity: '' }],
        categorySet: [],
        imageD: [],
    });

    const handleAddProduct = () => {
        onClose();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleImageChange = async (e) => {
        const files = e.target.files;
        // console.log(files);

        if (files) {
            try {
                const imagesArray = await Promise.all(
                    Array.from(files).map(async (file) => {
                        const imageUrl = await uploadFileToCloudinary(file);
                        return imageUrl;
                    }),
                );

                setNewProduct((prevProduct) => ({
                    ...prevProduct,
                    imageSet: [...prevProduct.imageSet, ...imagesArray],
                }));
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const handleAddPriceSizePair = () => {
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            priceSizePairs: [...prevProduct.priceSizePairs, { id: null, size: '', price: '', quantity: '' }],
        }));
    };

    const handlePriceSizeChange = (index, field, value) => {
        const updatedPairs = [...newProduct.priceSizePairs];
        updatedPairs[index][field] = value;
        updatedPairs[index].check = true;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            priceSizePairs: updatedPairs,
        }));
    };

    const handleRemoveImage = (index) => {
        setNewProduct((prevProduct) => {
            const updatedImages = [...prevProduct.imageSet];
            let DImages = [...prevProduct.imageD];
            if (prevProduct.imageSet[index].id) DImages = [...DImages, prevProduct.imageSet[index].id];
            updatedImages.splice(index, 1);
            return {
                ...prevProduct,
                imageD: DImages,
                imageSet: updatedImages,
            };
        });
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
                        value={newProduct.name_product || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="formgroupimg">
                    <div className="form-group">
                        <label htmlFor="img">Hình ảnh:</label>
                        <input type="file" id="img" name="img" accept="image/*" onChange={handleImageChange} multiple />
                    </div>
                    {newProduct.imageSet.length > 0 && (
                        <div className="formimggroup">
                            {newProduct.imageSet.map((image, index) => (
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

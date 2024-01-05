import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const RatingModal = ({ isOpen, onClose, onSubmit }) => {
    const [newProduct, setNewProduct] = useState({
        content: '',
        id_imageSet: [],
        is_like: true,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value === 'true' }));
    };

    const handleImageChange = async (e) => {
        const files = e.target.files;

        if (files) {
            try {
                const imagesArray = await Promise.all(
                    Array.from(files).map(async (file) => {
                        const imageUrl = await uploadFileToCloudinary(file);
                        return { id: null, url: imageUrl };
                    }),
                );

                setNewProduct((prevProduct) => ({
                    ...prevProduct,
                    id_imageSet: [...prevProduct.id_imageSet, ...imagesArray],
                }));
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const handleRemoveImage = (index) => {
        setNewProduct((prevProduct) => {
            const updatedImages = [...prevProduct.id_imageSet];
            let DImages = [...prevProduct.imageD];
            if (prevProduct.id_imageSet[index].id) DImages = [...DImages, prevProduct.id_imageSet[index].id];
            updatedImages.splice(index, 1);
            return {
                ...prevProduct,
                imageD: DImages,
                id_imageSet: updatedImages,
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
        isOpen && (
            <div className="modal-overlay">
                <div className="modalnewproduct" style={{ fontSize: '16px', width: '800px', paddingTop: '50px' }}>
                    <h2>Đánh giá sản phẩm</h2>
                    <div className="form-group" style={{ paddingTop: '20px' }}>
                        <label htmlFor="content">Lời đánh giá:</label>
                        <input
                            type="text"
                            id="content"
                            name="content"
                            value={newProduct.content}
                            onChange={handleInputChange}
                            style={{
                                width: '100%',
                                padding: '8px',
                                boxSizing: 'border-box',
                                marginTop: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '16px',
                                marginBottom: '10px',
                            }}
                        />
                    </div>
                    <div className="form-group" style={{ paddingTop: '20px' }}>
                        <label>Thích sản phẩm?</label>
                        <div>
                            <label style={{ paddingLeft: '20px' }}>
                                <input
                                    type="radio"
                                    name="is_like"
                                    value="true"
                                    checked={newProduct.is_like === true}
                                    onChange={handleRadioChange}
                                />
                                Có
                            </label>
                            <label style={{ paddingLeft: '20px' }}>
                                <input
                                    type="radio"
                                    name="is_like"
                                    value="false"
                                    checked={newProduct.is_like === false}
                                    onChange={handleRadioChange}
                                />
                                Không
                            </label>
                        </div>
                    </div>
                    <div className="formgroupimg" style={{ paddingTop: '20px' }}>
                        <div className="form-group">
                            <label htmlFor="img">Hình ảnh:</label>
                            <input
                                type="file"
                                id="img"
                                name="img"
                                accept="image/*"
                                onChange={handleImageChange}
                                multiple
                            />
                        </div>
                        {newProduct.id_imageSet.length > 0 && (
                            <div className="formimggroup">
                                {newProduct.id_imageSet.map((image, index) => (
                                    <div key={index} style={{ position: 'relative', marginBottom: '10px' }}>
                                        <img
                                            className="imgaddproduct"
                                            src={image.url}
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
                    <button
                        style={{ backgroundColor: 'red', color: 'white' }}
                        className="total-text"
                        onClick={() => onSubmit(newProduct)}
                    >
                        Gửi
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                        style={{ backgroundColor: 'blue', color: 'white' }}
                        onClick={onClose}
                        className="total-text"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        )
    );
};

export default RatingModal;

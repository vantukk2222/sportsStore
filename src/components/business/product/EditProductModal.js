import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import getUnAuth from '~/API/get';

const EditProductModal = ({ product, onClose, onSave }) => {
    const [editedProduct, setEditedProduct] = useState({
        id: product.id,
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
            check: false,
        })),
        categorySet: product.categorySet,
        imageD: [],
    });
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
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

    const handleAddPriceSizePair = () => {
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            priceSizePairs: [...prevProduct.priceSizePairs, { id: null, size: '', price: '', quantity: '' }],
        }));
    };

    const handlePriceSizeChange = (index, field, value) => {
        const updatedPairs = [...editedProduct.priceSizePairs];
        updatedPairs[index][field] = value;
        updatedPairs[index].check = true;
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            priceSizePairs: updatedPairs,
        }));
    };
    useEffect(() => {
        const categoryData = async () => {
            try {
                setLoading(true);
                let response = await getUnAuth(`category`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }

                response.content = response.content.map((e) => {
                    if (!editedProduct.categorySet.find((el) => e.name == el.name)) return e;
                });
              
                setSelectedCategories(response.content);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        categoryData();
    }, []);
 
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
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
                        {editedProduct.categorySet.map((category, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                                <span>{category?.name}</span>
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    onClick={() => {
                                        const updatedCategory = [...editedProduct.categorySet];
                               
                                        setSelectedCategories([...selectedCategories, updatedCategory[index]]);
                                        updatedCategory.splice(index, 1);
                                        setEditedProduct((prevProduct) => ({
                                            ...prevProduct,
                                            categorySet: updatedCategory,
                                        }));
                                    }}
                                    style={{ marginLeft: '5px', cursor: 'pointer', color: 'red' }}
                                />
                            </div>
                        ))}
                    </div>
                    <select
                        style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}
                        id="category"
                        name="category"
                        value={''}
                        onChange={(e) => {
                            const selectedCategory = selectedCategories.find((cat) => {
                                if (cat) return cat.name === e.target.value;
                            });
                            setSelectedCategories(
                                selectedCategories.filter((cat) => {
                                    if (cat) return cat.name !== e.target.value;
                                }),
                            );
                            const updatedCategory = [...editedProduct.categorySet, selectedCategory];
                            setEditedProduct((prevProduct) => ({
                                ...prevProduct,
                                categorySet: updatedCategory,
                            }));
                        }}
                    >
                        <option value="" disabled>
                            Chọn danh mục
                        </option>
                        {selectedCategories.map((category, index) => {
                            if (category)
                                return (
                                    <option key={index} value={category.name}>
                                        {category.name}
                                    </option>
                                );
                        })}
                    </select>
                </div>

                <div className="modal-buttons">
                    <button onClick={() => onSave(product.id, editedProduct)}>Lưu</button>
                    <button onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;

import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import getUnAuth from '~/API/get';
import postImage from '~/API/postImage';
import postProduct from '~/API/postProduct';
import { postProductInformation } from '~/API/postProductInformation';

const AddProductModal = ({ onClose }) => {
    const [newProduct, setNewProduct] = useState({
        // id: null,
        name: '',
        id_business: JSON.parse(localStorage.getItem('User')).id,
        imageSet: [],
        detail: '',
        // attribute: '',
        priceSizePairs: [{ id: null, size: '', price: '', quantity: '' }],
        categorySet: [],
        imageD: [],
    });

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleAddProduct = () => {
    
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        const t = () => {
            // Create an array to hold all the promises
            const promises = [];

            newProduct.imageSet.forEach((e, index) => {
                if (e.id == null) {
                    if (index == 0) {
                        const promise = postImage(newProduct.name, e.url, 'true', authToken)
                            .then((response) => (e.id = response.data))
                            .catch((error) => console.error('Error uploading image:', error));
                        promises.push(promise);
                    } else {
                        const promise = postImage(newProduct.name, e.url, 'false', authToken)
                            .then((response) => (e.id = response.data))
                            .catch((error) => console.error('Error uploading image:', error));
                        promises.push(promise);
                    }
                }
            });

            return Promise.all(promises);
        };
        t()
            .then(() => postProductInformation(newProduct, authToken))
            .then((response) => {
             
                const id = response.data;
                newProduct.priceSizePairs.forEach((e) => {
                    if (e.id == null) postProduct(id, e, authToken);
                });
            });
     
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;

        setNewProduct((prevProduct) => {
            if (!prevProduct.categorySet.includes(selectedCategory)) {
                return {
                    ...prevProduct,
                    categorySet: [...prevProduct.categorySet, selectedCategory],
                };
            } else {
                const updatedCategories = prevProduct.categorySet.filter((category) => category !== selectedCategory);
                return {
                    ...prevProduct,
                    categorySet: updatedCategories,
                };
            }
        });
    };

    const handleRemoveCategory = (index) => {
        setNewProduct((prevProduct) => {
            const updatedCategories = [...prevProduct.categorySet];
            updatedCategories.splice(index, 1);
            return {
                ...prevProduct,
                categorySet: updatedCategories,
            };
        });
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
    useEffect(() => {
        const categoryData = async () => {
            try {
                setLoading(true);
                const response = await getUnAuth(`category`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
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
                <h2>Thêm sản phẩm</h2>

                <div className="form-group">
                    <label htmlFor="name">Tên sản phẩm:</label>
                    <input type="text" id="name" name="name" value={newProduct.name} onChange={handleInputChange} />
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
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
                        {newProduct.categorySet.map((category, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                                <span>{category?.name}</span>
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    onClick={() => handleRemoveCategory(index)}
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
                            const updatedCategory = [...newProduct.categorySet, selectedCategory];
                            setNewProduct((prevProduct) => ({
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

                <div className="modal-buttons">
                    <button onClick={handleAddProduct}>Thêm</button>
                    <button onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;

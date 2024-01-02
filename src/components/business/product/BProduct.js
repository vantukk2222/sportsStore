import { useEffect, useState } from 'react';
import getUnAuth from '~/API/get';
import AddEventModal from './AddEventModal';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import { putProductInformation } from '~/API/putProductInformation';
import postImage from '~/API/postImage';
import deleteImage from '~/API/deleteImage';
import postProduct from '~/API/postProduct';
import putProduct from '~/API/putProduct';

const BProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
    const fetchData = async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem('User'));
            const response = await getUnAuth(`product-information/find-by-business/${user.id}`);
            if (!response) {
                throw new Error('Network response was not ok');
            }
            setSelectedProducts(Array(response.content.length).fill(false));
            response.content.forEach((e) => e.productSet.sort((a, b) => a.id - b.id));
            //console.log(response.content);
            setProducts(response.content);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleOpenEditModal = (index) => {
        setEditIndex(index);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveProduct = (id, editedProduct) => {
        console.log(editedProduct);
        const authToken = JSON.parse(localStorage.getItem('authToken'));

        const t = () => {
            // Create an array to hold all the promises
            const promises = [];

            editedProduct.imageSet.forEach((e) => {
                if (e.id == null) {
                    console.log(e.id);
                    const promise = postImage(editedProduct.name, e.url, authToken)
                        .then((response) => (e.id = response.data))
                        .catch((error) => console.error('Error uploading image:', error));

                    promises.push(promise);
                }
            });

            editedProduct.priceSizePairs.forEach((e) => {
                if (e.id == null) {
                    const promise = postProduct(editedProduct.id, e, authToken).catch((error) =>
                        console.error('Error posting product:', error),
                    );
                    promises.push(promise);
                }
                if (e.check) {
                    const promise = putProduct(editedProduct.id, e, authToken).catch((error) =>
                        console.error('Error posting product:', error),
                    );
                    promises.push(promise);
                }
            });

            return Promise.all(promises);
        };

        t()
            .then(() => {
                if (Array.isArray(editedProduct.imageD)) {
                    editedProduct.imageD.forEach((e) => {
                        deleteImage(e, authToken);
                    });
                } else {
                    console.error('editedProduct.imageSet is not an array.');
                }
            })
            .then(() => putProductInformation(id, editedProduct, authToken))
            .then(() => {
                fetchData();
                setEditIndex(null);
                handleCloseEditModal();
            })
            .catch((error) => {
                console.error('Error uploading images:', error);
            });
    };

    const handleDeleteProduct = (index) => {
        // Handle product deletion logic
    };

    const handleCheckboxChange = (index) => {
        const updatedSelectedProducts = [...selectedProducts];
        updatedSelectedProducts[index] = !updatedSelectedProducts[index];
        setSelectedProducts(updatedSelectedProducts);
    };

    const isAnyCheckboxChecked = selectedProducts.some((isChecked) => isChecked);

    const handleEventButtonClick = () => {
        setIsAddEventModalOpen(true);
    };

    const handleCloseAddEventModal = () => {
        setIsAddEventModalOpen(false);
    };

    const handleSaveEvent = (eventName) => {
        console.log('Event Name:', eventName);
        setIsAddEventModalOpen(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="track-container">
            <h2>Quản lý sản phẩm</h2>
            <button type="button" onClick={handleOpenAddModal}>
                Thêm sản phẩm
            </button>
            {isAnyCheckboxChecked && (
                <>
                    <button className="eventButton" onClick={handleEventButtonClick}>
                        Thêm sự kiện
                    </button>
                    <button className="eventButton">Xóa sự kiện</button>
                </>
            )}
            <div className="tracking-header">
                <div className="divproductB"></div>
                <div className="divproductB">Tên sản phẩm</div>
                <div className="divproductB">Hình ảnh</div>
                <div className="divproductB">Mô tả sản phẩm</div>
                <div className="divproductC">Sizes-Giá tiền-Số lượng</div>
                <div className="divproductB">
                    <p>Phân loại</p>
                </div>
                <div className="divproductB">Giảm giá</div>
                <div className="divproductB">Thao tác</div>
            </div>

            {products.map((product, index) => (
                <div className="tracking-info" key={index}>
                    <div className="divproductB">
                        <input
                            type="checkbox"
                            checked={selectedProducts[index]}
                            onChange={() => handleCheckboxChange(index)}
                        />
                    </div>

                    <div className="divproductB">{product.name}</div>
                    <div className="divproductB">
                        <img
                            src={product.imageSet?.find((e) => e.is_main === true)?.url}
                            alt={`Product ${index + 1}`}
                        />
                    </div>
                    <div className="divproductB">{product.detail || 'Không có'}</div>

                    <div className="divproductC">
                        {product.productSet.map((sizeInfo, i) => (
                            <div key={i}>
                                <span>{sizeInfo.size}-</span>
                                <span>{sizeInfo.price}đ-</span>
                                <span>{sizeInfo.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <div className="divproductB">{product.categorySet.reduce((a, e) => a + `${e.name},`, '')}</div>
                    <div className="divproductB">{product.discount}%</div>

                    <div className="divproductB">
                        <button className="editproduct" onClick={() => handleOpenEditModal(index)}>
                            Sửa
                        </button>
                        <button
                            className="deleteproduct"
                            onClick={() => handleDeleteProduct(index)}
                            disabled={!selectedProducts[index]}
                        >
                            Xóa
                        </button>
                        <button className="unproduct">Ẩn</button>
                    </div>
                </div>
            ))}

            {isAddModalOpen && <AddProductModal onClose={handleCloseAddModal} onSave={handleSaveProduct} />}
            {isEditModalOpen && (
                <EditProductModal
                    product={products[editIndex]}
                    onClose={handleCloseEditModal}
                    onSave={handleSaveProduct}
                />
            )}
            {isAddEventModalOpen && <AddEventModal onClose={handleCloseAddEventModal} onSaveEvent={handleSaveEvent} />}
        </div>
    );
};

export default BProduct;

import { useEffect, useState } from 'react';
import deleteImage from '~/API/deleteImage';
import getUnAuth from '~/API/get';
import postImage from '~/API/postImage';
import postProduct from '~/API/postProduct';
import { postSProductInformation } from '~/API/postSProductInformation';
import putProduct from '~/API/putProduct';
import { putProductInformation } from '~/API/putProductInformation';
import { putRemoveSale } from '~/API/putRemoveSale';
import { putUHproduct } from '~/API/putUHproduct';
import Pagination from '~/components/Shop/Pagination';
import AddEventModal from './AddEventModal';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

const BProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
    const [addEProduct, setAddEProduct] = useState([]);
    const [state, setState] = useState(0);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPage] = useState(0);
    const fetchData = async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem('User'));
            const response = await getUnAuth(
                `product-information/find-by-business/${user.id}?page=${page}&page_size=10&state=${state}`,
            );
            if (!response) {
                throw new Error('Network response was not ok');
            }
            setSelectedProducts(Array(response.content.length).fill(false));
            response.content.forEach((e) => e.productSet.sort((a, b) => a.id - b.id));
            setTotalPage(response.totalPages);
            console.log(response.content);
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
                    const promise = postImage(editedProduct.name, e.url, 'false', authToken)
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

    const handleCheckboxChange = (index) => {
        const updatedSelectedProducts = [...selectedProducts];
        updatedSelectedProducts[index] = !updatedSelectedProducts[index];
        let arr = [];
        updatedSelectedProducts.forEach((e, index) => {
            if (e) arr.push(products[index].id);
        });
        setAddEProduct(arr);
        //   console.log(arr);
        setSelectedProducts(updatedSelectedProducts);
    };
    const handleHide = (id, state) => {
        if (state == 2) state = false;
        else state = true;
        const authToken = JSON.parse(localStorage.getItem('authToken'));

        putUHproduct(id, state, authToken).then(() => fetchData());
    };
    const isAnyCheckboxChecked = selectedProducts.some((isChecked) => isChecked);

    const handleEventButtonClick = () => {
        setIsAddEventModalOpen(true);
    };

    const handleCloseAddEventModal = () => {
        setIsAddEventModalOpen(false);
    };

    const handleSaveEvent = (id) => {
        //   console.log('Event Name:', id);
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        postSProductInformation(id, addEProduct, authToken)
            .then(() => fetchData())
            .then(handleCloseAddEventModal());
    };
    const handleDeleteEvent = () => {
        // console.log(addEProduct);
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        putRemoveSale(addEProduct, authToken).then(() => fetchData());
    };
    useEffect(() => {
        fetchData();
    }, [state, page]);

    return (
        <div className="track-container">
            <h2>Quản lý sản phẩm</h2>
            <input style={{ width: '400px' }} type="text" placeholder="Tìm kiếm " />
            <button>Tìm kiếm</button>
            <div className="menu">
                <p className="menu-item" onClick={() => setState(0)}>
                    Sản phẩm bình thường
                </p>
                <p className="menu-item" onClick={() => setState(1)}>
                    Sản phẩm bị khóa
                </p>
                <p className="menu-item" onClick={() => setState(2)}>
                    Sản phẩm bị ẩn
                </p>
            </div>
            <button type="button" onClick={handleOpenAddModal}>
                Thêm sản phẩm
            </button>
            {isAnyCheckboxChecked && (
                <>
                    <button
                        className="eventButton"
                        style={{ backgroundColor: '#FF0000' }}
                        onClick={handleEventButtonClick}
                    >
                        Thêm sự kiện
                    </button>
                    <button className="eventButton" style={{ backgroundColor: '#4169E1' }} onClick={handleDeleteEvent}>
                        Xóa sự kiện
                    </button>
                </>
            )}
            <div className="tracking-headerp">
                <div className="divproductA"></div>
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

            {products.length > 0 ? (
                products.map((product, index) => (
                    <div className="tracking-infop" key={index}>
                        <div className="divproductA">
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
                                    <span>{sizeInfo.size || 'FreeSize'}-</span>
                                    <span>{sizeInfo.price}đ-</span>
                                    <span>{sizeInfo.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="divproductB">{product.categorySet.reduce((a, e) => a + `${e.name},`, '')}</div>
                        <div className="divproductB">{product.sale?.discount}%</div>

                        <div className="divproductB">
                            <button className="editproduct" onClick={() => handleOpenEditModal(index)}>
                                Sửa
                            </button>
                            {product.state == 0 && (
                                <button className="unproduct" onClick={() => handleHide(product.id, product.state)}>
                                    Ẩn
                                </button>
                            )}
                            {product.state == 2 && (
                                <button className="buttonproduct" onClick={() => handleHide(product.id, product.state)}>
                                    Hiện
                                </button>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <h3>Không có sản phẩm</h3>
            )}

            {isAddModalOpen && <AddProductModal onClose={handleCloseAddModal} onSave={handleSaveProduct} />}
            {isEditModalOpen && (
                <EditProductModal
                    product={products[editIndex]}
                    onClose={handleCloseEditModal}
                    onSave={handleSaveProduct}
                />
            )}
            {isAddEventModalOpen && <AddEventModal onClose={handleCloseAddEventModal} onSaveEvent={handleSaveEvent} />}
            {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
        </div>
    );
};

export default BProduct;

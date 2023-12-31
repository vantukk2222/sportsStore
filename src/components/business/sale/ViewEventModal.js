import { useState } from 'react';
import SelectProductsModal from './SelectProductsModal'; // Import the new modal

const ViewEventModal = ({ event, products, onClose, onSelectProducts }) => {
    const [isSelectProductsModalOpen, setIsSelectProductsModalOpen] = useState(false);

    const handleOpenSelectProductsModal = () => {
        setIsSelectProductsModalOpen(true);
    };

    const handleCloseSelectProductsModal = () => {
        setIsSelectProductsModalOpen(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modalnewproduct">
                <h2>Xem sự kiện</h2>
                <div className="form-group">
                    <label htmlFor="eventCode">Mã sự kiện:</label>
                    <input type="text" id="eventCode" value={event.eventCode} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="eventName">Tên sự kiện:</label>
                    <input type="text" id="eventName" value={event.eventName} readOnly />
                </div>

                <div className="form-group">
                    <label htmlFor="discount">Giảm giá:</label>
                    <input type="text" id="discount" value={event.discount} readOnly />
                </div>

                <div className="form-group">
                    <label htmlFor="fromDate">Từ ngày:</label>
                    <input type="text" id="fromDate" value={event.fromDate} readOnly />
                </div>

                <div className="form-group">
                    <label htmlFor="toDate">Đến ngày:</label>
                    <input type="text" id="toDate" value={event.toDate} readOnly />
                </div>

                <div className="form-group">
                    <label htmlFor="selectedProducts">Sản phẩm liên quan:</label>
                    {event && event.selectedProducts ? (
                        <>
                            <ul>
                                {event.selectedProducts.map((productId) => (
                                    <li key={productId}>{/* Render the selected product details here */}</li>
                                ))}
                            </ul>
                            <button onClick={handleOpenSelectProductsModal}>Chọn sản phẩm</button>
                        </>
                    ) : (
                        <p>No selected products</p>
                    )}
                </div>

                <div className="modal-buttons">
                    <button onClick={onClose}>Đóng</button>
                </div>
            </div>

            {isSelectProductsModalOpen && (
                <SelectProductsModal
                    selectedProducts={event.selectedProducts}
                    products={products}
                    onSelectProducts={(selectedProducts) => {
                        onSelectProducts(event.eventCode, selectedProducts);
                        handleCloseSelectProductsModal();
                    }}
                    onClose={handleCloseSelectProductsModal}
                />
            )}
        </div>
    );
};

export default ViewEventModal;

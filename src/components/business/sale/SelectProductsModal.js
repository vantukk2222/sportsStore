import { useState } from 'react';

const SelectProductsModal = ({ selectedProducts, products, onSelectProducts, onClose }) => {
    const [selectedProductIds, setSelectedProductIds] = useState(selectedProducts);

    const handleProductSelection = (productId) => {
        setSelectedProductIds((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId)
                : [...prevSelected, productId],
        );
    };

    const handleSaveSelection = () => {
        onSelectProducts(selectedProductIds);
    };

    return (
        <div className="modal-overlay">
            <div className="modalnewproduct">
                <h2>Chọn sản phẩm</h2>
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <input
                                type="checkbox"
                                id={`select-product-${product.id}`}
                                checked={selectedProductIds.includes(product.id)}
                                onChange={() => handleProductSelection(product.id)}
                            />
                            <label htmlFor={`select-product-${product.id}`}>{product.name}</label>
                        </li>
                    ))}
                </ul>
                <div className="modal-buttons">
                    <button onClick={handleSaveSelection}>Lưu</button>
                    <button onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default SelectProductsModal;


import React from 'react';

const NewProductPage = () => {

    return (
        <div className="new-product-container">
            <h2>Thêm sản phẩm mới</h2>

            <form >
                <label htmlFor="productName">Tên sản phẩm:</label>
                <input
                    type="text"
                    id="productName"
                    name="productName"

                />

                <label htmlFor="productImage">Hình ảnh:</label>
                <input
                    type="file"
                    id="productImage"
                    name="productImage"
                    accept="image/*"
                />

                <label htmlFor="productCategory">Phân loại:</label>
                <input
                    type="text"
                    id="productCategory"
                    name="productCategory"

                />

                <label htmlFor="productPrice">Giá tiền:</label>
                <input
                    type="text"
                    id="productPrice"
                    name="productPrice"

                />

                <label htmlFor="productDescription">Mô tả:</label>
                <textarea
                    id="productDescription"
                    name="productDescription"
                />
                <button type="submit">Thêm sản phẩm</button>
            </form>
        </div>
    );
};

export default NewProductPage;

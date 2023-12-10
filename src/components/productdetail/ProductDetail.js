// ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './ProductDetail.css';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetail = () => {
    const location = useLocation();
    const [productItem, setProductItem] = useState([]);
    // const { dataProduct, loadingProduct, errorProduct } = useSelector((state) => state.detailProduct);
    // useEffect(() => {
    //     dispatch(clearDataProduct());
    //     const id = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
    //     dispatch(fetchGetProducts(id));
    // }, []);
    // useEffect(() => {
    //     if (dataProduct) setProductItem(dataProduct);
    // }, [dataProduct]);
    // console.log(productItem);
    return (
        <>
            <div className="product-detail-container">
                <div className="product-image-container">
                    {productItem.imageSet && (
                        <img
                            src={productItem.imageSet.find((e) => e.is_main === true).url}
                            alt=""
                            className="product-image"
                        />
                    )}
                </div>
                <div className="product-info-container">
                    <h2 className="product-name">{productItem.name}</h2>
                    <p className="product-price">${productItem.price_min}đ</p>
                    <p className="product-description">{productItem.detail}</p>
                    <p className="product-attribute">
                        <strong>Attribute:</strong> {productItem.attribute}
                    </p>
                    <p className="product-brand">
                        <strong>Brand:</strong> {productItem.brand}
                    </p>
                    <p className="product-quantity">
                        <strong>Quantity:</strong> {productItem.quantity}
                    </p>
                    <button className="add-to-cart-button">Thêm vào giỏ hàng</button>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;

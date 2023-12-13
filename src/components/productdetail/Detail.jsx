// ProductDescription.js
import React from 'react';

const Detail = ({ product }) => {
  return (
    <div className="product-description-container">
    <div>
    <div className='header-comment'>
    <h1 className="product-title">CHI TIẾT SẢN PHẨM</h1>
    </div>

      <h1 className="product-title">{product.name}</h1>
      <p className="product-price">${product.price}</p>
      <p className="product-detail">{product.detail}</p>
      <p className="product-attribute">
        <strong>Attribute:</strong> {product.attribute}
      </p>
      <p className="product-brand">
        <strong>Brand:</strong> {product.brand}
      </p>
      <p className="product-quantity">
        <strong>Quantity:</strong> {product.quantity}
      </p>
      <p className="product-size">
        <strong>Size:</strong> {product.sizes && product.sizes.map(size => size.name).join(', ')}
      </p>
    </div>
    <div>
    <div className='header-comment'>
    <h1 className="product-title">MÔ TẢ SẢN PHẨM</h1>
    </div>

      <h1 className="product-title">{product.name}</h1>
      <p className="product-price">${product.price}</p>
      <p className="product-detail">{product.detail}</p>
      <p className="product-attribute">
        <strong>Attribute:</strong> {product.attribute}
      </p>
      <p className="product-brand">
        <strong>Brand:</strong> {product.brand}
      </p>
      <p className="product-quantity">
        <strong>Quantity:</strong> {product.quantity}
      </p>
      <p className="product-size">
        <strong>Size:</strong> {product.sizes && product.sizes.map(size => size.name).join(', ')}
      </p>
    </div>
    
    </div>
    
    
  );
};

export default Detail;

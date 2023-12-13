import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa6';
import Shopdetail from './Shopdetail';
import Detail from './Detail';
import Comment from './Comment';

const shopItems = [
    {
        id: 1,
        name: 'Product 1',
        discount: 10,
        imageSet: [
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/10/30/969136/Cristiano-Ronaldo4.jpg' },
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/22/873088/Ronaldo1.jpg' },
            { url: 'https://mega.com.vn/media/news/0106_Hinh-nen-ronadol-4k6.jpg' },
            {
                url: 'https://cdnmedia.baotintuc.vn/Upload/DmtgOUlHWBO5POIHzIwr1A/files/2022/12/12/Ronaldo-12122022a.jpg',
            },
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/22/873088/Ronaldo1.jpg' },
        ],
        price: 100000,
        detail: 'Product 1 details',
        attribute: 'Attribute 1',
        brand: 'Brand 1',
        quantity: 10,
        sizes: [{ name: 'Small' }, { name: 'Medium' }, { name: 'Large' }],
    },
    {
        id: 2,
        name: 'Product 2', // Make sure each product has a unique name
        discount: 10,
        imageSet: [
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/22/873088/Ronaldo1.jpg' },
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/22/873088/Ronaldo1.jpg' },
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/22/873088/Ronaldo1.jpg' },
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/22/873088/Ronaldo1.jpg' },
            { url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/1/22/873088/Ronaldo1.jpg' },
        ],
        price: 100000,
        detail: 'Product 2 details', // Change details for each product
        attribute: 'Attribute 2', // Change attributes for each product
        brand: 'Brand 2', // Change brands for each product
        quantity: 10,
        sizes: [{ name: 'Small' }, { name: 'Medium' }, { name: 'Large' }],
    },
];

const ProductDetail = ({addToCart}) => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [startIndex, setStartIndex] = useState(0);
    const [start, setStart] = useState(0);

    const showNextImages = () => {
        const totalImages = product.imageSet.length;
        const imagesToShow = 3;
        setStartIndex((prevIndex) => (prevIndex + imagesToShow < totalImages ? prevIndex + 1 : 0));
    };

    const showPrevImages = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleimg = (index) => {
        setStart(index);
    };

    useEffect(() => {
        const selectedProduct = shopItems.find((item) => item.id === parseInt(id, 10));
        setProduct(selectedProduct || {});
    }, [id, shopItems]);

    return (
        <>
            <div className="product-detail-container">
                <div className="product-image-container">
                    <div className="main-image">
                        {product.imageSet && product.imageSet.length > 0 && (
                            <img
                                src={product.imageSet[start].url}
                                alt={`Product ${product.id} - Main Image`}
                                className="product-image"
                            />
                        )}
                    </div>
                    <div className="product-img">
                        <button className="iconimg" onClick={showPrevImages} disabled={startIndex === 0}>
                            <FaArrowLeft />
                        </button>
                        &nbsp;&nbsp;
                        <div className="thumbnail-images">
                            {product.imageSet &&
                                product.imageSet
                                    .slice(startIndex, startIndex + 3)
                                    .map((image, index) => (
                                        <img
                                            key={startIndex + index}
                                            src={image.url}
                                            alt={`Product ${product.id} - Thumbnail ${startIndex + index + 1}`}
                                            className="thumbnail-image"
                                            onClick={() => handleimg(startIndex + index)}
                                        />
                                    ))}
                        </div>
                        <button
                            className="iconimg"
                            onClick={showNextImages}
                            disabled={startIndex >= (product.imageSet?.length || 0) - 1}
                        >
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
                <div className="product-info-container">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-price">${product.price}</p>
                    <p className="product-description">{product.detail}</p>
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
                        <strong>Size:</strong>
                        {product.sizes &&
                            product.sizes.map((size, index) => (
                                <button className="sort" key={index}>
                                    {size.name}
                                </button>
                            ))}
                    </p>
                    <button onClick={() => addToCart(product)} className="add-to-cart-button">
                        Thêm vào giỏ hàng
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={() => addToCart(product)} className="add-to-cart-button">
                        Mua ngay
                    </button>
                </div>
            </div>

            <Shopdetail />
            <Detail product={product} />
            <Comment />
        </>
    );
};

export default ProductDetail;

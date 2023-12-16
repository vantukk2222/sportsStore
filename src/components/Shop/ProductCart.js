import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const ProductCart = ({ productItems }) => {
    const navigate = useNavigate();
    const handleClick = (id) => {
        if (id) navigate(`/product/${id}`);
    };
    console.log(productItems);
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };
    return (
        <>
            {productItems.map((product, index) => (
                <div key={index} className="box" onClick={() => handleClick(product.id)}>
                    <div className="product mtop">
                        <div key={product.id} className="img">
                            <span className="discount">{product.discount}% Off</span>
                            <Link to={`/product/${product.id}`}>
                                {product.imageSet.map(
                                    (eachImg, imgIndex) =>
                                        imgIndex === 0 && <img key={imgIndex} src={eachImg.url} alt="Product" />,
                                )}
                            </Link>
                            <div className="product-like">
                                <label>{count}</label> <br />
                                <i className="fa-regular fa-heart" onClick={increment}></i>
                            </div>
                        </div>
                        <div className="product-details">
                            <h3>{product.name}</h3>
                            <div className="rate">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="price">
                                <h4>{product.price_min}vnđ </h4>
                                <button>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProductCart;

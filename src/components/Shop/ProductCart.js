import { useState } from 'react';
import { useNavigate } from 'react-router';

const ProductCart = ({ productItems }) => {
    const navigate = useNavigate();
    const handleClick = (id) => {
        if (id) navigate(`/product/${id}`);
    };
    //console.log(productItems);
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };
    return (
        <>
            {productItems?.map((product, index) => (
                <div key={index} className="box" onClick={() => handleClick(product.id)}>
                    <div className="product mtop">
                        <div key={product.id} className="img">
                            <img src={product.imageSet.find((e) => e.is_main === true).url} alt="" />
                        </div>
                        <div className="product-details">
                            <h3>{product.name}</h3>
                            <div className="price">
                                <h4 className="crossedNumber">{product.price_min}vnđ </h4>
                                <h4>{product.price_min}vnđ </h4>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProductCart;

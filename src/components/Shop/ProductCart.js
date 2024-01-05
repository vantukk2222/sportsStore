import { useState } from 'react';
import { useNavigate } from 'react-router';

const ProductCart = ({ productItems }) => {
    const navigate = useNavigate();
    const handleClick = (id) => {
        if (id) navigate(`/product/${id}`);
    };
   
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };
    return (
        <>
            {productItems?.map((product, index) => {
                let givenTimeStr = product.sale?.ended_at || null;
                if (givenTimeStr) {
                    const givenTime = new Date(givenTimeStr);
                    const currentTime = new Date();
                    if (givenTime > currentTime) givenTimeStr = true;
                    else givenTimeStr = false;
                } else givenTimeStr = false;
                return (
                    <div key={index} className="box" onClick={() => handleClick(product.id)}>
                        <div className="product mtop">
                            <div key={product.id} className="img">
                                <img
                                    src={
                                        product.imageSet.find((e) => e.is_main === true)?.url || product.imageSet[0].url
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="product-details">
                                <h3>{product.name}</h3>
                                <p style={{ textAlign: 'left', color: 'gray', fontSize: 'small' }}>
                                    Đã bán:{product.number_buy}
                                </p>
                                <div className="price">
                                    {givenTimeStr && <h4 className="crossedNumber">{product.price_min}vnđ </h4>}
                                    <h4>
                                        {product.sale
                                            ? (product.price_min * (100 - product.sale?.discount)) / 100
                                            : product.price_min}
                                        vnđ
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ProductCart;

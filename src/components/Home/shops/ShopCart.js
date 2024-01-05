import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import getUnAuth from '~/API/get';
import Loading from '~/components/loading/Loading';
const ShopCart = ({ categoryItems }) => {
    const navigate = useNavigate();
    const [productItems, setProductItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleClick = (id) => {
        if (id) navigate(`/product/${id}`);
    };
    const [count, setCount] = useState(0);
   
    useEffect(() => {
        setCount(0);
        setProductItems([]);
    }, [categoryItems]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
             
                if (!categoryItems || count >= categoryItems.length || productItems.length >= 8) return;
                const response = await getUnAuth(
                    `product-information/find-by-category/${categoryItems[count].id}?state=0&state_business=0`,
                );
            
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                setCount((prevCount) => prevCount + 1);
                const dataProduct = response.content;
              
                if (dataProduct && productItems.length < 8) {
                    setProductItems((prevProduct) => {
                        for (var i = 0; i < dataProduct.length; i += 1) {
                            if (prevProduct.length == 8) break;
                            prevProduct = [...prevProduct, dataProduct[i]];
                        }
                        return prevProduct;
                    });
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [categoryItems, count]);

    return (
        <>
            {productItems.length < 8 ? (
                <Loading />
            ) : (
                productItems.map((value, index) => {
                    let givenTimeStr = value.sale?.ended_at || null;
                    if (givenTimeStr) {
                        const givenTime = new Date(givenTimeStr);
                        const currentTime = new Date();
                        if (givenTime > currentTime) givenTimeStr = true;
                        else givenTimeStr = false;
                    } else givenTimeStr = false;
                    return (
                        <div className="box" key={index} onClick={() => handleClick(value.id)}>
                            <div className="product mtop">
                                <div className="img">
                                    <img
                                        src={
                                            value.imageSet?.find((e) => e.is_main === true)?.url ||
                                            value.imageSet[0].url
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="product-details">
                                    <h3>{value.name}</h3>
                                    <p style={{ textAlign: 'left', color: 'gray', fontSize: 'small' }}>
                                        Đã bán:{value.number_buy}
                                    </p>
                                    <div className="price">
                                        {givenTimeStr && <h4 className="crossedNumber">{value.price_min}vnđ </h4>}
                                        <h4 className="">
                                            {value.sale
                                                ? (value.price_min * (100 - value.sale?.discount)) / 100
                                                : value.price_min}
                                            vnđ
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </>
    );
};

export default ShopCart;

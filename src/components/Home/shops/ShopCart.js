import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchGetProducts } from '~/redux/reducers/Product/getCategoryProducts';

const ShopCart = ({ categoryItems }) => {
    const navigate = useNavigate;
    const dispath = useDispatch();
    const { dataProduct, loadingProduct, errorProduct } = useSelector((state) => state.cateProducts);
    const [productItems, setProductItems] = useState(dataProduct.content);
    const handleClick = (id) => {
        if (id) navigate('/shop');
    };
    console.log(productItems);
    const [count, setCount] = useState(0);
    useEffect(() => {
        setCount(0);
        setProductItems([]);
    }, [categoryItems]);
    useEffect(() => {
        if (categoryItems[count] && categoryItems[count].id)
            dispath(fetchGetProducts(categoryItems[count].id)).then(() => setCount((prevCount) => prevCount + 1));
    }, [count]);
    useEffect(() => {
        if (dataProduct && dataProduct.content) {
            setProductItems((prevProduct) => [...prevProduct, ...dataProduct.content]);
        }
    }, [dataProduct]);
    return (
        <>
            {productItems.map((productItems, index) => {
                return (
                    <div className="box" key={index}>
                        <div className="product mtop">
                            <div className="img">
                                <img src={productItems.imageSet.find((e) => e.is_main === true).url} alt="" />
                            </div>
                            <div className="product-details">
                                <h3>{productItems.name}</h3>
                                <div className="price">
                                    <h4>${productItems.price_min}đ </h4>
                                    {/* step : 3  
                     if hami le button ma click garryo bahne 
                    */}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ShopCart;

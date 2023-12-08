import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchGetProducts } from '~/redux/reducers/Product/getCategoryProducts';

const ShopCart = ({ categoryItems }) => {
    const navigate = useNavigate();
    const dispath = useDispatch();
    const { dataProduct, loadingProduct, errorProduct } = useSelector((state) => state.cateProducts);
    const [productItems, setProductItems] = useState(dataProduct);
    const handleClick = (id) => {
        if (id) navigate(`/product/${id}`);
    };
    console.log(productItems);
    const [count, setCount] = useState(0);
    useEffect(() => {
        setCount(0);
        setProductItems([]);
    }, [categoryItems]);
    useEffect(() => {
        if (categoryItems[count] && categoryItems[count].id && productItems.length < 9) {
            dispath(fetchGetProducts(categoryItems[count].id)).then(() => setCount((prevCount) => prevCount + 1));
        }
    }, [categoryItems, count]);
    useEffect(() => {
        if (dataProduct && productItems.length < 9) {
            setProductItems((prevProduct) => {
                for (var i = 0; i < dataProduct.length; i += 1) {
                    if (prevProduct.length === 9) break;
                    prevProduct = [...prevProduct, dataProduct[i]];
                }

                return prevProduct;
            });
        }
    }, [dataProduct]);
    return (
        <>
            {productItems.map((value, index) => {
                return (
                    <div className="box" key={index} onClick={() => handleClick(value.id)}>
                        <div className="product mtop">
                            <div className="img">
                                <img src={value.imageSet.find((e) => e.is_main === true).url} alt="" />
                            </div>
                            <div className="product-details">
                                <h3>{value.name}</h3>
                                <div className="price">
                                    <h4>${value.price_min}đ </h4>
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

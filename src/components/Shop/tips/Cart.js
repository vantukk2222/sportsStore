import Ndata from './Ndata';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetProducts } from '~/redux/reducers/Product/getShopProduct';

const Cart = ({ shopItem }) => {
    const dispatch = useDispatch();
    const { dataProduct, loadingProduct, errorProduct } = useSelector((state) => state.shopProducts);
    const [productItems, setProductItems] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    useEffect(() => {
        if (shopItem.id) dispatch(fetchGetProducts(`find-by-business/${shopItem.id}`, page, pageSize));
    }, [shopItem, page, pageSize]);
    useEffect(() => {
        if (dataProduct && dataProduct.content) setProductItems(dataProduct.content);
    }, [dataProduct]);
    return (
        <>
            <div className="content grid product">
                {productItems.map((val, index) => {
                    return (
                        <div className="box" key={index}>
                            <div className="img">
                                <img src={val.imageSet[0].url} alt="" />
                            </div>
                            <h4>{val.name}</h4>
                            <span>${val.price}</span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Cart;

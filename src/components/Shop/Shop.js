import { useDispatch, useSelector } from 'react-redux';
import MainShop from './MainShop';
import { useState, useEffect } from 'react';
import { fetchGetShops } from '~/redux/reducers/Business/shop';
import Tips from './tips/Tips';

const Shop = () => {
    const dispatch = useDispatch();
    const { dataShop, loadingShop, errorShop } = useSelector((state) => state.shops);
    const [shopItem, setShopItem] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);
    useEffect(() => {
        dispatch(fetchGetShops(page, pageSize));
    }, [page, pageSize]);
    useEffect(() => {
        if (dataShop && dataShop.content) setShopItem(...dataShop.content);
    }, [dataShop]);
    return (
        <section className="shop background">
            <MainShop shopItem={shopItem} />
            <Tips shopItem={shopItem} />
        </section>
    );
};
export default Shop;

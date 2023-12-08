// ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './ProductDetail.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetProducts, clearDataProduct } from '~/redux/reducers/Product/getDetailProduct';

const ProductDetail = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [productItem, setProductItem] = useState([]);
    const { dataProduct, loadingProduct, errorProduct } = useSelector((state) => state.detailProduct);
    useEffect(() => {
        dispatch(clearDataProduct());
        const id = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
        dispatch(fetchGetProducts(id));
    }, []);
    useEffect(() => {
        if (dataProduct) setProductItem(dataProduct);
    }, [dataProduct]);
    console.log(productItem);
    return <></>;
};

export default ProductDetail;

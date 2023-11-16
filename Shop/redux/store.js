import { configureStore } from '@reduxjs/toolkit';
import productSlice from './reducer/productReducer/product';
import productDetailSlice from './reducer/productReducer/getDetailProduct'

export const store = configureStore({
    reducer: {
        product: productSlice,
        productDetail: productDetailSlice
    },
})

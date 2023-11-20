import { configureStore } from '@reduxjs/toolkit';
import productSlice from './reducers/productReducer/product';
import productDetailSlice from './reducers/productReducer/getDetailProduct'
import loginSlice from './reducers/Login/signinReducer'
import registerSlice from './reducers/Register/signupReducer';
import productSearchSlice from './reducers/productReducer/searchProducts';
import categorySlice from './reducers/Caregory/getAllCategories';

export const store = configureStore({

    reducer: {
        product: productSlice,
        productDetail: productDetailSlice,
        productSearch: productSearchSlice,
        login: loginSlice,
        register: registerSlice,
        categories: categorySlice,

    },
})

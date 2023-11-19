import { configureStore } from '@reduxjs/toolkit';
import productSlice from './reducers/productReducer/product';
import productDetailSlice from './reducers/productReducer/getDetailProduct'
import loginSlice from './reducers/Login/signinReducer'
import registerSlice from './reducers/Register/signupReducer'


export const store = configureStore({
    
    reducer: {
        product: productSlice,
        productDetail: productDetailSlice,
        login: loginSlice,
        register: registerSlice
    },
})

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import groupCategorySlice from '~/redux/reducers/Caregory/getAllCategories';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import loginSlice from './reducers/Login/signinReducer';
import productSlice from './reducers/Product/getproduct';
import saleSlice from './reducers/Sale/sale'
const rootReducer = combineReducers({
    categories: groupCategorySlice,
    loginUser: loginSlice,
    products:productSlice,
    sales: saleSlice,
});
const persistConfig = {
    key: 'root',
    storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});
export const persistor = persistStore(store);

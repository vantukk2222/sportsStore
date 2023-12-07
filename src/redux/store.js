import { combineReducers, configureStore } from '@reduxjs/toolkit';
import groupCategorySlice from '~/redux/reducers/Caregory/getAllCategories';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import loginSlice from './reducers/Login/signinReducer';
import SproductSlice from './reducers/Product/getSlideProduct';
import saleSlice from './reducers/Sale/sale';
import shop from './reducers/Business/shop';
import FDproductSlide from './reducers/Product/getFlashDealProduct'
const rootReducer = combineReducers({
    categories: groupCategorySlice,
    loginUser: loginSlice,
    slideProducts: SproductSlice,
    flashDealProducts: FDproductSlide,
    sales: saleSlice,
    shops: shop,
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

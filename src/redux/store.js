import { combineReducers, configureStore } from '@reduxjs/toolkit';
import groupCategorySlice from '~/redux/reducers/Category/getAllCategories';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import loginSlice from './reducers/Login/signinReducer';
import SproductSlice from './reducers/Product/getSlideProduct';
import saleSlice from './reducers/Sale/sale';
import shop from './reducers/Business/shop';
import FDproductSlide from './reducers/Product/getFlashDealProduct';
import ShproductSlice from './reducers/Product/getShopProduct';
import CproductSlide from './reducers/Product/getCategoryProducts';
import DlproductSlice from './reducers/Product/getDetailProduct';
const rootReducer = combineReducers({
    categories: groupCategorySlice,
    loginUser: loginSlice,
    slideProducts: SproductSlice,
    flashDealProducts: FDproductSlide,
    sales: saleSlice,
    shops: shop,
    shopProducts: ShproductSlice,
    cateProducts: CproductSlide,
    detailProduct: DlproductSlice,
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

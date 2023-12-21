import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import addToCartSlice from './reducers/Cart/cartReducer';
import listCartSlice from './reducers/Cart/listCartReducer';
import removeCartItemSlice from './reducers/Cart/removeCartReducer';

const rootReducer = combineReducers({
    listCartReducer: listCartSlice,
    removeItemCartReducer: removeCartItemSlice,
    addToCartReducer: addToCartSlice,
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

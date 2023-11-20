import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import productSlice from './reducers/productReducer/product';
import productDetailSlice from './reducers/productReducer/getDetailProduct'
import loginSlice from './reducers/Login/signinReducer'
import registerSlice from './reducers/Register/signupReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';


const rootReducer = combineReducers({
    product: productSlice,
    productDetail: productDetailSlice,
    login: loginSlice,
    register: registerSlice
})
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    // middleware: getDefaultMiddleware => getDefaultMiddleware({
    //     serializableCheck:false
    // })
})
export const persistor =persistStore(store)


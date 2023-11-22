import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import productSlice from './reducers/productReducer/product';
import productDetailSlice from './reducers/productReducer/getDetailProduct'
import loginSlice from './reducers/Login/signinReducer'
import productSearchSlice from './reducers/productReducer/searchProducts';
import groupCategorySlice from './reducers/Caregory/getAllCategories';
import registerSlice from './reducers/Register/signupReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import productByCategorySlice from './reducers/Caregory/getProductByCategory';


const rootReducer = combineReducers({
  product: productSlice,
  productDetail: productDetailSlice,
  productSearch: productSearchSlice,
  login: loginSlice,
  register: registerSlice,
  categories: groupCategorySlice,
  productsByCategory: productByCategorySlice,
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
export const persistor = persistStore(store)


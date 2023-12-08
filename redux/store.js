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
// <<<<<<< categoryDat
import quantitySlice from './reducers/Size/getQuantityReducer';
import sizeProductSlice from './reducers/Size/getProduct';

// =======
import userSlice from './reducers/User/userInfor'
import addToCartSlice from './reducers/Cart/cartReducer'
import listCartSlice from './reducers/Cart/listCartReducer'
import productByBusinessSlice from './reducers/Business/getProductByBusiness'
import saleSlice from './reducers/Sale/getAllSale'
import getProductBySaleSlice from './reducers/productReducer/getProductBySale'
import saleByBusinessSlice from './reducers/Sale/getSalesbyIdBusiness'
import saleByDiscountSlice from './reducers/Sale/getSaleByDiscount'
import searchProductInSaleSlice from './reducers/productReducer/searchProductInSale';
import setInforUserSlice from './reducers/User/setInforUser'
import saveBillSlice  from './reducers/Bill/billReducer';
import removeCartItemSlice from './reducers/Cart/removeCartReducer'

// {userSlice}
// >>>>>>> NewD

const rootReducer = combineReducers({
  product: productSlice,
  productDetail: productDetailSlice,
  productSearch: productSearchSlice,
  login: loginSlice,
  register: registerSlice,
  categories: groupCategorySlice,
  productsByCategory: productByCategorySlice,
  quantity: quantitySlice,
  sizeProduct: sizeProductSlice,
  userData: userSlice,
  addToCartReducer: addToCartSlice,
  listCartReducer: listCartSlice,
  productByBusiness: productByBusinessSlice,
  sales: saleSlice,
  getProductBySale: getProductBySaleSlice,
  saleByBusiness: saleByBusinessSlice,
  saleByDiscount: saleByDiscountSlice,
  searchProductInSale: searchProductInSaleSlice,
  saveBillReducer: saveBillSlice,
  removeItemCartReducer:removeCartItemSlice

  setInforUser: setInforUserSlice,
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


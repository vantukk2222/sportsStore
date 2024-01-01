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
import saveBillSlice from './reducers/Bill/billReducer';
import removeCartItemSlice from './reducers/Cart/removeCartReducer';
import roleSlice from './reducers/Role/roleReducer';
import savePaymentSlice from './reducers/Payment/paymentReducer'
import putStateProductSlice from './reducers/productReducer/putChangeState';
import createImageSlice from './reducers/Images/ImageReducer'
import createProductInformationSlice from './reducers/productReducer/createProductInformation'
import createProductSizeSlice from './reducers/productReducer/ProductSize/createProductSize'
import deleteProductInformationSlice from './reducers/productReducer/deleteProductInformation'
import hireProductSlice from './reducers/productReducer/hireProduct';
import createNewSaleSlice from './reducers/Sale/createNewSale';
import addProductInSaleSlice from './reducers/Sale/addProductInSale';
import removeProductinforSaleSlice from './reducers/Sale/removeProduct';
import getSaleByIdSlice from './reducers/Sale/getSalebyId';
import editSaleSlice from './reducers/Sale/putSale';
import editProductSlice from './reducers/productReducer/editProduct';
import getProductSizeSlice from './reducers/productReducer/ProductSize/getProductSize';
import editProductSizeSlice from './reducers/productReducer/ProductSize/editProductSize';
import deleteSizeSlice from './reducers/Size/DeleteSize';
import getStatisticSlice from './reducers/Statistic/getStatistic';
// {userSlice}
// >>>>>>> NewD
import getBillbyIdBusiSlice from './reducers/Bill/getBillbyIdBusiness';
import confirmBillSlice from './reducers/Bill/confirmBill';
import getAllBillSlice from './reducers/Bill/getBillUserReducer'
import getBusinessByIDSlice from './reducers/Business/getBusinessByID'
import cancelBillSlice from './reducers/Bill/billCancelReducer'
import createImageCommentSlice from './reducers/Images/ImageCommentReducer'
import createCommentSlice from './reducers/Comment/commentReducer'
// {createImageCommentSlice}
// {createCommentSlice}
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
  removeItemCartReducer: removeCartItemSlice,
  setInforUser: setInforUserSlice,
  role: roleSlice,
  savePaymentReducer: savePaymentSlice,
  putStateProduct: putStateProductSlice,
  createImage: createImageSlice,
  createProductInformation: createProductInformationSlice,
  createProductSize: createProductSizeSlice,
  deleteProductInformation: deleteProductInformationSlice,
  hireProduct: hireProductSlice,
  createNewSale: createNewSaleSlice,
  addProductInSale: addProductInSaleSlice,
  removeProductinforSale: removeProductinforSaleSlice,
  getSaleById: getSaleByIdSlice,
  editSale: editSaleSlice,
  editProduct: editProductSlice,
  getProductSize: getProductSizeSlice,
  editProductSize: editProductSizeSlice,
  deleteSize: deleteSizeSlice,
  getStatistic: getStatisticSlice,
  getAllBillReducer: getAllBillSlice,
  getBusinessByIDReducer: getBusinessByIDSlice,
  cancelBillReducer :cancelBillSlice,
  getBillbyIdBusi: getBillbyIdBusiSlice,
  confirmBill: confirmBillSlice,
  createImageComment: createImageCommentSlice,
  createComment: createCommentSlice,
})
// {getBusinessByIDSlice}
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
    }),
});
export const persistor = persistStore(store)


import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";
import { toastError, toastsuccess } from "../../../components/toastCustom";
import postProductinforInSale from "../../../API/Sale/postProductInforInSale";


const productOfSaleState = {
    dataProductOfSale: null,
    loadingProductOfSale: false,
    errorProductOfSale: null
}
const addProductInSaleSlice = createSlice({
    name: 'addProductInSale',
    initialState: productOfSaleState,
    reducers: {
        getStart: (state) => {
            state.loadingProductOfSale = true;
            state.errorProductOfSale = null;
        },
        getSuccess: (state, action) => {
            // console.log("reducer user success: ",action.payload);
            state.loadingProductOfSale = false;
            state.dataProductOfSale = action.payload;
        },

        getFailure: (state, action) => {
            state.errorProductOfSale = action.payload;
            state.loadingProductOfSale = false;
        },
        resetProductInSale: (state) => {
            return productOfSaleState
        }
    }
});

export const addProductSale = (saleId, productIds) => async (dispatch, getState) => {
    //console.log('product infor redux', Product);
    try {
        dispatch(getStart());
        const authToken = getState().login.authToken

        const data = await postProductinforInSale(saleId, productIds, authToken);
        //console.log('API create id product', data.data);
        console.log("data status", data);
        dispatch(getSuccess(data));
        toastsuccess('Thêm sản phẩm', 'Thành công')
        return data
    } catch (error) {
        console.log(('reducer create sale error ', error.message));
        dispatch(getFailure(error.message))
        toastError('Không thể', 'Thêm sản phẩm')
    }
    // return data
}

export const { getStart, getSuccess, getFailure, resetProductInSale } = addProductInSaleSlice.actions;

export default addProductInSaleSlice.reducer;
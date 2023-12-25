import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";
import postSale from "../../../API/Sale/postSale";
import { toastError, toastsuccess } from "../../../components/toastCustom";
import putRemoveProductinforSale from "../../../API/Sale/putRemoveProductinforSale";


const removeProductState = {
    dataRemoveProduct: null,
    loadingRemoveProduct: false,
    errorRemoveProduct: null
}
const removeProductinforSaleSlice = createSlice({
    name: 'removeProductinforSale',
    initialState: removeProductState,
    reducers: {
        getStart: (state) => {
            state.loadingRemoveProduct = true;
            state.errorRemoveProduct = null;
        },
        getSuccess: (state, action) => {
            // console.log("reducer user success: ",action.payload);
            state.loadingRemoveProduct = false;
            state.dataRemoveProduct = action.payload;
        },

        getFailure: (state, action) => {
            state.errorRemoveProduct = action.payload;
            state.loadingRemoveProduct = false;
        },
        resetRemoveProductinforSale: (state) => {
            return removeProductState
        }
    }
});

export const removeProInSale = (productIds) => async (dispatch, getState) => {
    //console.log('product infor redux', Product);
    try {
        dispatch(getStart());
        const authToken = getState().login.authToken
        //  console.log("token", authToken);
        const data = await putRemoveProductinforSale(productIds, authToken);
        //console.log('API create id product', data.data);
        dispatch(getSuccess(data));
        toastsuccess('Xóa sản phẩm', 'Thành công')
    } catch (error) {
        console.log(('reducer remove product sale error ', error.message));
        dispatch(getFailure(error.message))
        toastError('Không thể', 'Xóa sản phẩm')
    }
    // return data
}

export const { getStart, getSuccess, getFailure, resetRemoveProductinforSale } = removeProductinforSaleSlice.actions;

export default removeProductinforSaleSlice.reducer;
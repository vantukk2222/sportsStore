import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";
import { postProductInformation } from "../../../API/Product/postProductInformation";
import { postProductSize } from "../../../../API/Product/postProductSize";
import { toastsuccess } from "../../../../components/toastCustom";


const initialState = {
    dataProductSize: null,
    loadingProductSize: false,
    errorProductSize: null
}
const createProductSizeSlice = createSlice({
    name: 'createProductSize',
    initialState,
    reducers: {
        getStart: (state) => {
            state.loadingProductSize = true;
            state.errorProductSize = null;
        },
        getSuccess: (state, action) => {
            // console.log("reducer user success: ",action.payload);
            state.loadingProductSize = false;
            state.dataProductSize = action.payload;
        },

        getFailure: (state, action) => {
            state.errorProductSize = action.payload;
            state.loadingProductSize = false;
        },
        resetProductSize: (state) => {
            return initialState
        }
    }
});

export const createProductSizes = (ProductSize) => async (dispatch, getState) => {
    //console.log('product infor redux', Product);
    try {
        dispatch(getStart());
        const authToken = getState().login.authToken
        //  console.log("token", authToken);
        const data = await postProductSize(ProductSize, authToken);
        console.log('API create id product', data);
        if (data.status === 202 || data.status === 200) {
            toastsuccess('Thêm kích thước', 'Thành công')
        }

        dispatch(getSuccess(data));
    } catch (error) {
        console.log(('reducer create product size error ', error.message));
        dispatch(getFailure(error.message))
    }
    // return data
}

export const { getStart, getSuccess, getFailure, resetProductSize } = createProductSizeSlice.actions;

export default createProductSizeSlice.reducer;
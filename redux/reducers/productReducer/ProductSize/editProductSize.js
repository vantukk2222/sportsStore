import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";
import putProdutSize from "../../../../API/Product/putProductSize";
import { toastError } from "../../../../components/toastCustom";


const editProductSizeState = {
    dataEditProductSize: null,
    loadingEditProductSize: false,
    errorEditProductSize: null
}
const editProductSizeSlice = createSlice({
    name: 'editProductSize',
    initialState: editProductSizeState,
    reducers: {
        getStart: (state) => {
            state.loadingEditProductSize = true;
            state.errorEditProductSize = null;
        },
        getSuccess: (state, action) => {
            // console.log("reducer user success: ",action.payload);
            state.loadingEditProductSize = false;
            state.dataEditProductSize = action.payload;
        },

        getFailure: (state, action) => {
            state.errorEditProductSize = action.payload;
            state.loadingEditProductSize = false;
        },
        resetEditProductSize: (state) => {
            return editProductSizeState
        }
    }
});

export const editProductSizes = (idProductSize, ProductSize) => async (dispatch, getState) => {
    //console.log('product infor redux', Product);
    try {
        dispatch(getStart());
        const authToken = getState().login.authToken
        //  console.log("token", authToken);
        const data = await putProdutSize(idProductSize, ProductSize, authToken);
        console.log('STATUS edit id product size', data);
        dispatch(getSuccess(data));
    } catch (error) {
        toastError('Lối', 'Không thể chỉnh kích thước sản phẩm')
        dispatch(getFailure(error.message))
    }
    // return data
}

export const { getStart, getSuccess, getFailure, resetEditProductSize } = editProductSizeSlice.actions;

export default editProductSizeSlice.reducer;
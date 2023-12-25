import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../Login/signinReducer";
import { store } from "../../store";
import { toastsuccess } from "../../../components/toastCustom";
import getProductSize from "../../../../API/Product/getProductSize";

const getProductSizeState = {
    dataGetProductSize: [],
    loadingGetProductSize: false,
    errorGetProductSize: null
}

const getProductSizeSlice = createSlice({
    name: 'getProductSize',
    initialState: getProductSizeState,
    reducers: {
        getStart: (state) => {
            //console.log("state details:", state)
            state.loadingGetProductSize = true;
            state.errorGetProductSize = null;
        },
        getSuccess: (state, action) => {
            state.dataGetProductSize = action.payload
            state.loadingGetProductSize = false;
        },
        getFailure: (state, action) => {
            state.errorGetProductSize = action.payload;
            state.loadingGetProductSize = false;
        },
        resetGetProductSize: (state) => {
            return getProductSizeState; // Reset the productDetail state to its initial state
        },
    }
});
export const fetchProductSizebyId = (idProductinfor) => async (dispatch) => {

    try {
        dispatch(getStart());
        const data = await getProductSize(idProductinfor);
        // console.log('get product size', data);
        dispatch(getSuccess(data));

    } catch (error) {
        let errorMessage = 'Error fetching data';

        console.error("error get productsize by id", error.response.data.message);
        // store.dispatch(logout())

        dispatch(getFailure(error.message));
    }
};
export const { getStart, getSuccess, getFailure, resetGetProductSize } = getProductSizeSlice.actions;
export default getProductSizeSlice.reducer;
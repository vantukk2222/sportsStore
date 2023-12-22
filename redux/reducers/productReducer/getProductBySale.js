import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../Login/signinReducer";
import { store } from "../../store";
import getProductBySale from "../../../API/Product/getProductBySale";

const productSaleState = {
    dataProductbySale: [],
    loadingProductbySale: false,
    errorProductbySale: null
}

const getProductBySaleSlice = createSlice({
    name: 'getProductBySale',
    initialState: productSaleState,
    reducers: {
        getStart: (state) => {
            //console.log("state details:", state)
            state.loadingProductbySale = true;
            state.errorProductbySale = null;
        },
        getSuccess: (state, action) => {
            state.dataProductbySale = action.payload;
            state.loadingProductbySale = false;
        },
        getFailure: (state, action) => {
            state.errorProductbySale = action.payload;
            state.loadingProductbySale = false;
        },
        resetProductbySale: (state) => {
            return productofSaleState; // Reset the productDetail state to its initial state
        },
    }
});
export const fetchProductbySale = (idSale, page, pageSize, sort, desc, state) => async (dispatch) => {

    try {
        dispatch(getStart());
        const data = await getProductBySale(idSale, page, pageSize, sort, desc, state);
        // console.log('saleeeee', data)
        dispatch(getSuccess(data));
    } catch (error) {
        let errorMessage = 'Error fetching data';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }
        // store.dispatch(logout())

        dispatch(getFailure(errorMessage));
    }
};
export const { getStart, getSuccess, getFailure, resetProductbySale } = getProductBySaleSlice.actions;
export default getProductBySaleSlice.reducer;
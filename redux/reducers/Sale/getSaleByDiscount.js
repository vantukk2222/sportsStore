import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../Login/signinReducer";
import { store } from "../../store";
import getSaleByDiscount from "../../../API/Sale/getSaleByDiscount";


const initialState = {
    dataSalebyDiscount: [],
    loadingSalebyDiscount: false,
    errorSalebyDiscount: null
}

const saleByDiscountSlice = createSlice({
    name: 'saleByDiscount',
    initialState,
    reducers: {
        getStart: (state) => {
            state.loadingSalebyDiscount = true;
            state.errorSalebyDiscount = null;
        },
        getSuccess: (state, action) => {
            state.dataSalebyDiscount = action.payload;
            state.loadingSalebyDiscount = false;
        },
        getFailure: (state, action) => {
            state.errorSalebyDiscount = action.payload;
            state.loadingSalebyDiscount = false;
        },
        resetSaleByDiscount: (state) => {
            return initialState; // Reset the productDetail state to its initial state
        },
    }
});
export const fetchSaleByDiscount = (discount_min, discount_max, page, pageSize, sort, desc) => async (dispatch) => {

    try {
        dispatch(getStart());
        const data = await getSaleByDiscount(discount_min, discount_max, page, pageSize, sort, desc);
        // console.log('get product by category', data);
        dispatch(getSuccess(data));
    } catch (error) {
        let errorMessage = 'Error fetching sale of discount';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }
        // store.dispatch(logout())
        dispatch(getFailure(errorMessage));
    }
};
export const { getStart, getSuccess, getFailure, resetSaleByDiscount } = saleByDiscountSlice.actions;
export default saleByDiscountSlice.reducer;
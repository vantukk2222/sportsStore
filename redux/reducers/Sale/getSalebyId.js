import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../Login/signinReducer";
import { store } from "../../store";
import getProductBySale from "../../../API/Product/getProductBySale";
import getSalebyId from "../../../API/Sale/getSalebyId";

const saleByIdState = {
    dataSalebyId: null,
    loadingSalebyId: false,
    errorSalebyId: null
}

const getSaleByIdSlice = createSlice({
    name: 'getSaleById',
    initialState: saleByIdState,
    reducers: {
        getStart: (state) => {
            //console.log("state details:", state)
            state.loadingSalebyId = true;
            state.errorSalebyId = null;
        },
        getSuccess: (state, action) => {
            state.dataSalebyId = action.payload;
            state.loadingSalebyId = false;
        },
        getFailure: (state, action) => {
            state.errorSalebyId = action.payload;
            state.loadingSalebyId = false;
        },
        resetSaleById: (state) => {
            return saleByIdState; // Reset the productDetail state to its initial state
        },
    }
});
export const fetchSaleById = (idSale) => async (dispatch) => {

    try {
        dispatch(getStart());
        const data = await getSalebyId(idSale);
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
export const { getStart, getSuccess, getFailure, resetSaleById } = getSaleByIdSlice.actions;
export default getSaleByIdSlice.reducer;
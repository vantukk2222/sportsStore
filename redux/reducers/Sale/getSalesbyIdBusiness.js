import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../Login/signinReducer";
import { store } from "../../store";
import getSalebyIdBusiness from "../../../API/Sale/getSalesbyIdBusiness";


const initialState = {
    dataSalebyBusi: [],
    loadingSalebyBusi: false,
    errorSalebyBusi: null
}

const saleByBusinessSlice = createSlice({
    name: 'saleByBusiness',
    initialState,
    reducers: {
        getStart: (state) => {
            state.loadingSalebyBusi = true;
            state.errorSalebyBusi = null;
        },
        getSuccess: (state, action) => {
            state.dataSalebyBusi = action.payload;
            state.loadingSalebyBusi = false;
        },
        getFailure: (state, action) => {
            state.errorSalebyBusi = action.payload;
            state.loadingSalebyBusi = false;
        },
        resetSaleByBusiness: (state) => {
            return initialState; // Reset the productDetail state to its initial state
        },
    }
});
export const fetchSalesByBusiness = (idBusi, page, pageSize, sort, desc) => async (dispatch) => {

    try {
        dispatch(getStart());
        const data = await getSalebyIdBusiness(idBusi, page, pageSize, sort, desc);
        // console.log('get product by category', data);
        dispatch(getSuccess(data));
    } catch (error) {
        let errorMessage = 'Error fetching sale of business';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }
        // store.dispatch(logout())
        dispatch(getFailure(errorMessage));
    }
};
export const { getStart, getSuccess, getFailure, resetSaleByBusiness } = saleByBusinessSlice.actions;
export default saleByBusinessSlice.reducer;
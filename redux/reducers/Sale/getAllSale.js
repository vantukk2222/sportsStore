import { createSlice } from "@reduxjs/toolkit";
import getAllSale from "../../../API/Sale/getAllSale";
import { logout } from "../Login/signinReducer";
import { store } from "../../store";

const initialState = {
    dataSale: [],
    loadingSale: false,
    errorSale: null
}

const saleSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        getStart: (state) => {
            state.loadingSale = true;
            state.errorSale = null;
        },
        getSuccess: (state, action) => {
            state.dataSale = action.payload;
            state.loadingSale = false;
        },
        getFailure: (state, action) => {
            state.errorSale = action.payload;
            state.loadingSale = false;
        },
        resetSale: (state) => {
            return initialState; // Reset the productDetail state to its initial state
        },
    }
});
export const fetchAllSale = (page, pageSize) => async (dispatch) => {

    try {
        // console.log("cate in redux: ");
        dispatch(getStart());
        const data = await getAllSale(page, pageSize);
        dispatch(getSuccess(data));
    } catch (error) {
        let errorMessage = 'Error fetching data of categories';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }
        // store.dispatch(logout())
        dispatch(getFailure(errorMessage));
    }
};
export const { getStart, getSuccess, getFailure, resetSale } = saleSlice.actions;
export default saleSlice.reducer;
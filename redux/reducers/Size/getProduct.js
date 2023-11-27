import { createSlice } from "@reduxjs/toolkit";
import getSizeProduct from "../../../API/Size/getProduct";

const initialState = {
    dataSizeProduct: '',
    loadingSizeProduct: false,
    errorSizeProduct: null
}

const sizeProductSlice = createSlice({
    name: 'sizeProduct',
    initialState,
    reducers: {
        getStart: (state) => {
            //console.log("state details:", state)
            state.loadingSizeProduct = true;
            state.errorSizeProduct = null;
        },
        getSuccess: (state, action) => {
            state.dataSizeProduct = action.payload;
            state.loadingSizeProduct = false;
        },
        getFailure: (state, action) => {
            state.errorSizeProduct = action.payload;
            state.loadingSizeProduct = false;
        },
        resetSizeProduct: (state) => {
            return initialState;
        },
    }
});
export const fetchSizeProduct = (id) => async (dispatch) => {

    try {
        dispatch(getStart());
        const data = await getSizeProduct(id);
        dispatch(getSuccess(data));
    } catch (error) {
        let errorMessage = 'Error fetching data get product by size';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }

        dispatch(getFailure(errorMessage));
    }
};
export const { getStart, getSuccess, getFailure, resetSizeProduct } = sizeProductSlice.actions;
export default sizeProductSlice.reducer;
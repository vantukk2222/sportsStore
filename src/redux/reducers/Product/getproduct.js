import { createSlice } from "@reduxjs/toolkit";
import getUnAuth from "~/API/getUnAuth";

const initialState = {
    dataProduct: [],
    loadingProduct: false,
    errorProduct: null
}
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getAllStart: (state) => {
            state.loadingProduct = true;
            state.errorProduct = null;
        },
        getAllsuccess: (state, action) => {
            state.loadingProduct = false;
            state.dataProduct = action.payload;
        },
        getAllFailure: (state, action) => {
            state.errorProduct = action.payload;
            state.loadingProduct = false;
        }
    }
});
export const fetchGetProducts = (page, pageSize) => async (dispatch) => {
    try {
        dispatch(getAllStart());
        
        const data = await getUnAuth(`product?page=${page}&page_size=${pageSize}`);
        dispatch(getAllsuccess(data));
    } catch (error) {
        dispatch(getAllFailure(error.message))
    }
}
export const { getAllStart, getAllsuccess, getAllFailure } = productSlice.actions;

export default productSlice.reducer;
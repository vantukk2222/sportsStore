import { createSlice } from "@reduxjs/toolkit";
import getUnAuth from "~/API/getUnAuth";

const initialState = {
    data: [],
    loading: false,
    error: null
}
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getAllStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getAllsuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        getAllFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});
export const fetchProducts = (page, pageSize, sort, desc) => async (dispatch) => {
    try {
        dispatch(getAllStart());
        
        const data = await getUnAuth(`product?page=${page}&page_size=${pageSize}&sort=${sort}&desc=${desc}`);
        dispatch(getAllsuccess(data));
    } catch (error) {
        dispatch(getAllFailure(error.message))
    }
}
export const { getAllStart, getAllsuccess, getAllFailure } = productSlice.actions;

export default productSlice.reducer;
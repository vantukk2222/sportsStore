import { createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../../../API/Product";

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
export const { getAllStart, getAllsuccess, getAllFailure } = productSlice.actions;
export const fetchProducts = (page, pageSize, sort, desc) => async (dispatch) => {
    try {
        dispatch(getAllStart());
        const data = await getProduct(page, pageSize, sort, desc);
        dispatch(getAllsuccess(data));
    } catch (error) {
        dispatch(getAllFailure(error.message))
    }
}
export default productSlice.reducer;
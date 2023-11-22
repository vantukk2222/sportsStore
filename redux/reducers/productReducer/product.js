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
            //console.log(action.payload);
            state.loading = false;
            state.data = action.payload;
        },
        getAllFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
        // removeAll(state,action) =>{

        // }
    }
});
export const fetchProducts = (page, pageSize, sort, desc) => async (dispatch) => {
    try {
        dispatch(getAllStart());
        const data = await getProduct(page, pageSize, sort, desc);
        console.log("List product error: ", 1);
        dispatch(getAllsuccess(data));
    } catch (error) {
        dispatch(getAllFailure(error.message))
        throw error.response.message
    }
}
export const { getAllStart, getAllsuccess, getAllFailure } = productSlice.actions;

export default productSlice.reducer;
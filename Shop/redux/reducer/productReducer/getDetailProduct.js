import { createSlice } from "@reduxjs/toolkit";
import { getProductById } from "../../../API/Product";

const initialState = {
    data: '',
    loading: false,
    error: null
}
const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        getStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        getFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});
export const { getStart, getSuccess, getFailure } = productDetailSlice.actions;
export const fetchProductbyId = (id) => async (dispatch) => {
    try {
        dispatch(getStart());
        const data = await getProductById(id);
        dispatch(getSuccess(data));
    } catch (error) {
        let errorMessage = 'Error fetching data';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }

        dispatch(getFailure(errorMessage));
    }
};
export default productDetailSlice.reducer;
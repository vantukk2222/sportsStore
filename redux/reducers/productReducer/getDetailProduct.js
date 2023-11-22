import { createSlice } from "@reduxjs/toolkit";
import getProductById from "../../../API/Product/getProductById";

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
            state.data = { ...action.payload, imgUrl: action.payload?.imageSet[0].url };
            state.loading = false;
        },
        getFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});
export const fetchProductbyId = (id) => async (dispatch) => {

    try {
        // console.log("ID detail: "+ id +"\n data detail: "+ 1);
        dispatch(getStart());
        const data = await getProductById(id);
        dispatch(getSuccess(data));
    } catch (error) {
        let errorMessage = 'Error fetching data nha';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }

        dispatch(getFailure(errorMessage));
        throw error.response.message
    }
};
export const { getStart, getSuccess, getFailure } = productDetailSlice.actions;
export default productDetailSlice.reducer;
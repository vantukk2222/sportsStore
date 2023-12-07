import { createSlice } from '@reduxjs/toolkit';
import getUnAuth from '~/API/getUnAuth';

const initialState = {
    dataProduct: [],
    loadingProduct: false,
    errorProduct: null,
};
const CproductSlice = createSlice({
    name: 'cproduct',
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
        },
    },
});
export const fetchGetProducts = (id) => async (dispatch) => {
    try {
        dispatch(getAllStart());
        const data = await getUnAuth(`product-information/find-by-category/${id}`);
        // console.log(data);
        dispatch(getAllsuccess(data));
    } catch (error) {
        dispatch(getAllFailure(error.message));
    }
};
export const { getAllStart, getAllsuccess, getAllFailure } = CproductSlice.actions;

export default CproductSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import getUnAuth from '~/API/getUnAuth';

const initialState = {
    dataProduct: [],
    loadingProduct: false,
    errorProduct: null,
};
const ShproductSlice = createSlice({
    name: 'shproduct',
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
export const fetchGetProducts = (link, page, pageSize) => async (dispatch) => {
    try {
        dispatch(getAllStart());
        // console.log(link, page, pageSize);
        const data = await getUnAuth(`product-information${link ? `/` + link : ``}?page=${page}&page_size=${pageSize}`);
        // console.log(data);
        dispatch(getAllsuccess(data));
    } catch (error) {
        dispatch(getAllFailure(error.message));
    }
};
export const { getAllStart, getAllsuccess, getAllFailure } = ShproductSlice.actions;

export default ShproductSlice.reducer;

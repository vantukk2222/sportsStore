import { createSlice } from '@reduxjs/toolkit';
import getUnAuth from '~/API/getUnAuth';

const initialState = {
    dataProduct: [],
    loadingProduct: false,
    errorProduct: null,
};
const DlproductSlice = createSlice({
    name: 'dlproduct',
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
        clearDataProduct: (state) => {
            state.dataProduct = [];
            state.loadingProduct = false;
        },
    },
});
export const fetchGetProducts = (id) => async (dispatch) => {
    try {
        dispatch(getAllStart());
        const data = await getUnAuth(`product-information/${id}`);
        // console.log(data);
        dispatch(getAllsuccess(data));
    } catch (error) {
        dispatch(getAllFailure(error.message));
    }
};
export const { getAllStart, getAllsuccess, getAllFailure, clearDataProduct } = DlproductSlice.actions;

export default DlproductSlice.reducer;

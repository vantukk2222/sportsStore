import { createSlice } from "@reduxjs/toolkit";
import getUnAuth from "~/API/getUnAuth";

const initialState = {
    dataSale: [],
    loadingSale: false,
    errorSale: null
}
const saleSlice = createSlice({
    name: 'sale',
    initialState,
    reducers: {
        getAllStart: (state) => {
            state.loadingSale = true;
            state.errorSale = null;
        },
        getAllsuccess: (state, action) => {
            state.loadingSale = false;
            state.dataSale = action.payload;
        },
        getAllFailure: (state, action) => {
            state.errorSale = action.payload;
            state.loadingSale = false;
        }
    }
});
export const fetchSales = (page, pageSize, sort, desc) => async (dispatch) => {
    try {
        dispatch(getAllStart());
        
        const data = await getUnAuth(`sale?page=${page}&page_size=${pageSize}&sort=${sort}&desc=${desc}`);
        dispatch(getAllsuccess(data));
    } catch (error) {
        dispatch(getAllFailure(error.message))
    }
}
export const { getAllStart, getAllsuccess, getAllFailure } = saleSlice.actions;

export default saleSlice.reducer;
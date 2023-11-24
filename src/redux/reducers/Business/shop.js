import { createSlice } from "@reduxjs/toolkit";
import getUnAuth from "~/API/getUnAuth";

const initialState = {
    dataShop: [],
    loadingShop: false,
    errorShop: null
}
const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        getAllStart: (state) => {
            state.loadingShop = true;
            state.errorShop = null;
        },
        getAllsuccess: (state, action) => {
            state.loadingShop = false;
            state.dataShop = action.payload;
        },
        getAllFailure: (state, action) => {
            state.errorShop = action.payload;
            state.loadingShop = false;
        }
    }
});
export const fetchGetShops = (page, pageSize) => async (dispatch) => {
    try {
        dispatch(getAllStart());
        
        const data = await getUnAuth(`business?page=${page}&page_size=${pageSize}`);
        dispatch(getAllsuccess(data));
    } catch (error) {
        dispatch(getAllFailure(error.message))
    }
}
export const { getAllStart, getAllsuccess, getAllFailure } = shopSlice.actions;

export default shopSlice.reducer;
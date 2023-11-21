import { createSlice } from "@reduxjs/toolkit";
import getCategory from "../../../API/Category/getCategory";

const initialState = {
    dataCate: '',
    loadingCate: false,
    errorCate: null
}

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        getStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getSuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        getFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});
export const fetchCategories = (pageSize, sort, desc) => async (dispatch) => {

    try {
        dispatch(getStart());
        const data = await getCategory(pageSize, sort, desc);
        // console.log(data);
        dispatch(getSuccess(data));
    } catch (error) {
        let errorMessage = 'Error fetching data of categories';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }

        dispatch(getFailure(errorMessage));
    }
};
export const { getStart, getSuccess, getFailure } = categorySlice.actions;
export default categorySlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import getUnAuth from '~/API/getUnAuth';

const initialState = {
    dataCate: [],
    loadingCate: false,
    errorCate: null,
};

const groupCategorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        getStart: (state) => {
            state.loadingCate = true;
            state.errorCate = null;
        },
        getSuccess: (state, action) => {
            state.dataCate = action.payload;
            state.loadingCate = false;
        },
        getFailure: (state, action) => {
            state.errorCate = action.payload;
            state.loadingCate = false;
        },
    },
});
export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch(getStart());
        const data = await getUnAuth('category/get-group');
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
export const { getStart, getSuccess, getFailure } = groupCategorySlice.actions;
export default groupCategorySlice.reducer;

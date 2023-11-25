import { createSlice } from "@reduxjs/toolkit";
import getGroupCategory from "../../../API/Category/getGroupCategory";
import { logout } from "../Login/signinReducer";
import { store } from "../../store";

const initialState = {
    dataCate: [],
    loadingCate: false,
    errorCate: null
}

const groupCategorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        getStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getSuccess: (state, action) => {
            state.dataCate = action.payload;
            state.loading = false;
        },
        getFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});
export const fetchCategories = () => async (dispatch) => {

    try {
        // console.log("cate in redux: ");
        dispatch(getStart());
        const data = await getGroupCategory();
        dispatch(getSuccess(data));
    } catch (error) {
        let errorMessage = 'Error fetching data of categories';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }
        // store.dispatch(logout())
        dispatch(getFailure(errorMessage));
    }
};
export const { getStart, getSuccess, getFailure } = groupCategorySlice.actions;
export default groupCategorySlice.reducer;
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
        resetCategory: (state) => {
            return initialState
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
export const { getStart, getSuccess, getFailure, resetCategory } = groupCategorySlice.actions;
export default groupCategorySlice.reducer;
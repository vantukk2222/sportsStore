import { createSlice } from "@reduxjs/toolkit";
import getUserByIDUser from "../../../API/User/getUserByID";

const comment_list_userState = {
    data: {},
    loading: false,
    error: null
}

const listUserSlice = createSlice({
    name: 'listUserReducer',
    initialState: comment_list_userState,
    reducers: {
        getStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getSuccess: (state, action) => {
            const data_detail = { ...action.payload};
            state.data[`${data_detail.id}`] = data_detail
            state.loading = false;
        },
        getFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        resetUSerInforComment: (state) => {
            return comment_list_userState; // Reset the productDetail state to its initial state
        },
    }
});

export const fetchUserCommentByID = (id) => async (dispatch) => {
    //console.log('id', id);
    try {
        dispatch(getStart());
        const data = await getUserByIDUser(id);
        
        dispatch(getSuccess(data));

    } catch (error) {
        let errorMessage = 'Error fetching data get user by id';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }
        // store.dispatch(logout())

        dispatch(getFailure(errorMessage));
    }
};
export const { getStart, getSuccess, getFailure, resetUSerInforComment } = listUserSlice.actions;
export default listUserSlice.reducer;
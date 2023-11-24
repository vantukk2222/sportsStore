import { createSlice } from "@reduxjs/toolkit";
import getQuantityById from "../../../API/Size/getQuantityById";

const initialState = {
    dataQuality: '',
    loadingQuality: false,
    errorQuality: null
}

const quantitySlice = createSlice({
    name: 'quantity',
    initialState,
    reducers: {
        getStart: (state) => {
            //console.log("state details:", state)
            state.loadingQuality = true;
            state.errorQuality = null;
        },
        getSuccess: (state, action) => {
            state.dataQuality = action.payload;
            state.loadingQuality = false;
        },
        getFailure: (state, action) => {
            state.errorQuality = action.payload;
            state.loadingQuality = false;
        },
        resetQuantity: (state) => {
            return initialState;
        },
    }
});
export const fetchQuantitybyId = (id) => async (dispatch) => {

    try {
        dispatch(getStart());
        const data = await getQuantityById(id);
        dispatch(getSuccess(data));
    } catch (error) {
        let errorMessage = 'Error fetching data';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }

        dispatch(getFailure(errorMessage));
    }
};
export const { getStart, getSuccess, getFailure, resetQuantity } = quantitySlice.actions;
export default quantitySlice.reducer;
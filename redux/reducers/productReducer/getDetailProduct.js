import { createSlice } from "@reduxjs/toolkit";
import getProductById from "../../../API/Product/getProductById";
import { logout } from "../Login/signinReducer";
import { store } from "../../store";

const initialState = {
    data: '',
    loading: false,
    error: null
}

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        getStart: (state) => {
            //console.log("state details:", state)
            state.loading = true;
            state.error = null;
        },
        getSuccess: (state, action) => {
            state.data = { ...action.payload, imgUrl: action.payload?.imageSet[0].url };
            state.loading = false;
        },
        getFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});
export const fetchProductbyId = (id) => async (dispatch) => {

    try {
        dispatch(getStart());
        const data = await getProductById(id);
        // console.log("ID product and data product in redux product detail: "+ id+ "\t" + JSON.stringify(data));
        dispatch(getSuccess(data));
    } catch (error) {
        let errorMessage = 'Error fetching data';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }
        // store.dispatch(logout())

        dispatch(getFailure(errorMessage));
    }
};
export const { getStart, getSuccess, getFailure } = productDetailSlice.actions;
export default productDetailSlice.reducer;
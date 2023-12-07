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
            const data_detail = { ...action.payload, imgUrl: action.payload?.imageSet[0].url };
            state.data = {...state.data, data_detail}
            state.loading = false;
        },
        getFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        resetProductDetail: (state) => {
            return initialState; // Reset the productDetail state to its initial state
        },
    }
});
export const fetchProductbyId = (id) => async (dispatch) => {

    try {
        dispatch(getStart());
        const data = await getProductById(id);
// <<<<<<< categoryDat
        console.log("getproductbyid\n", id + data);
// =======
        // console.log("ID product and data product in redux product detail: "+ id+ "\t" + JSON.stringify(data));
// >>>>>>> NewD
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
export const { getStart, getSuccess, getFailure, resetProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;
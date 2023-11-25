import { createSlice } from "@reduxjs/toolkit";
import searchProduct from "../../../API/Product/searchProduct";
import { logout } from "../Login/signinReducer";
import { store } from "../../store";

const initialState = {
    dataSearch: [],
    loadingSearch: false,
    errorSearch: null
}

const productSearchSlice = createSlice({
    name: 'productSearch',
    initialState,
    reducers: {
        getStart: (state) => {
            //console.log("state details:", state)
            state.loadingSearch = true;
            state.errorSearch = null;
        },
        getSuccess: (state, action) => {
            state.dataSearch = action.payload; // { ...action.payload, imgUrl: action.payload?.imageSet[0].url };
            state.loadingSearch = false;
        },
        getFailure: (state, action) => {
            state.errorSearch = action.payload;
            state.loadingSearch = false;
        }
    }
});

export const fetchProductbySearch = (name) => async (dispatch) => {

    try {
        dispatch(getStart());
        const data = await searchProduct(name, 0);
        //console.log(data);
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
export const { getStart, getSuccess, getFailure } = productSearchSlice.actions;
export default productSearchSlice.reducer;
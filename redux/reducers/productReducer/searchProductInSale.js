import { createSlice } from "@reduxjs/toolkit";
import searchProduct from "../../../API/Product/searchProduct";
import { logout } from "../Login/signinReducer";
import { store } from "../../store";
import searchProductInSale from "../../../API/Product/searchProductInSale";

const initialState = {
    dataSearchProductInSale: [],
    loadingSearchProductInSale: false,
    errorSearchProductInSale: null
}

const searchProductInSaleSlice = createSlice({
    name: 'searchProductInSale',
    initialState,
    reducers: {
        getStart: (state) => {
            //console.log("state details:", state)
            state.loadingSearchProductInSale = true;
            state.errorSearchProductInSale = null;
        },
        getSuccess: (state, action) => {
            state.dataSearchProductInSale = action.payload; // { ...action.payload, imgUrl: action.payload?.imageSet[0].url };
            state.loadingSearchProductInSale = false;
        },
        getFailure: (state, action) => {
            state.errorSearchProductInSale = action.payload;
            state.loadingSearchProductInSale = false;
        }
    }
});

export const fetchProductInSale = (idSale, name, state) => async (dispatch) => {

    try {
        dispatch(getStart());
        const data = await searchProductInSale(idSale, name, state);
        dispatch(getSuccess(data));
    } catch (error) {
        let errorMessage = 'Error fetching search product in sale';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }
        // store.dispatch(logout())

        dispatch(getFailure(errorMessage));
    }
};
export const { getStart, getSuccess, getFailure } = searchProductInSaleSlice.actions;
export default searchProductInSaleSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../Login/signinReducer";
import { store } from "../../store";
import getProductByBusiness from "../../../API/Business/getProductByBusiness";


const initialState = {
    dataProductbyBusi: [],
    loadingProductbyBusi: false,
    errorProductbyBusi: null
}

const productByBusinessSlice = createSlice({
    name: 'productByBusiness',
    initialState,
    reducers: {
        getStart: (state) => {
            state.loadingProductbyBusi = true;
            state.errorProductbyBusi = null;
        },
        getSuccess: (state, action) => {
            state.dataProductbyBusi = action.payload;
            state.loadingProductbyBusi = false;
        },
        getFailure: (state, action) => {
            state.errorProductbyBusi = action.payload;
            state.loadingProductbyBusi = false;
        },
        resetProductByBusiness: (state) => {
            return initialState; // Reset the productDetail state to its initial state
        },
    }
});
export const fetchProductsByBusiness = (idBusi, page, pageSize, sort, desc, state) => async (dispatch) => {

    try {
        dispatch(getStart());
        const data = await getProductByBusiness(idBusi, page, pageSize, sort, desc, state);
        // console.log('get product by category', data);
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
export const { getStart, getSuccess, getFailure, resetProductByBusiness } = productByBusinessSlice.actions;
export default productByBusinessSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import getProductByCategory from "../../../API/Category/getProductByCategory";
import { logout } from "../Login/signinReducer";
import { store } from "../../store";


const initialState = {
    dataProductbyCate: [],
    loadingProductbyCateCate: false,
    errorProductbyCateCate: null
}

const productByCategorySlice = createSlice({
    name: 'productByCategory',
    initialState,
    reducers: {
        getStart: (state) => {
            state.loadingProductbyCateCate = true;
            state.errorProductbyCateCate = null;
        },
        getSuccess: (state, action) => {
            state.dataProductbyCate = action.payload;
            state.loadingProductbyCateCate = false;
        },
        getFailure: (state, action) => {
            state.errorProductbyCateCate = action.payload;
            state.loadingProductbyCateCate = false;
        }
    }
});
export const fetchProductsByCategories = (idCate, page, pageSize, sort, desc) => async (dispatch) => {

    try {
        dispatch(getStart());
        const data = await getProductByCategory(idCate, page, pageSize, sort, desc);
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
export const { getStart, getSuccess, getFailure } = productByCategorySlice.actions;
export default productByCategorySlice.reducer;
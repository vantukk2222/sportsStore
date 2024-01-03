import { createSlice } from "@reduxjs/toolkit";
import getProductById from "../../../API/Product/getProductById";
import { logout } from "../Login/signinReducer";
import { store } from "../../store";
import { toastsuccess } from "../../../components/toastCustom";

const productinforState = {
    data: {},
    loading: false,
    error: null
}

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: productinforState,
    reducers: {
        getStart: (state) => {
            //console.log("state details:", state)
            state.loading = true;
            state.error = null;
        },
        getSuccess: (state, action) => {
            const data_detail = { ...action.payload, imgUrl: action.payload?.imageSet[0].url };
            state.data[`${data_detail.id}`] = data_detail
            // state.data = {...state.data, data_detail}
            state.loading = false;
        },
        getFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setLoading: (state) => {
            state.loading = false;

        },
        resetProductDetail: (state) => {
            return productinforState; // Reset the productDetail state to its initial state
        },
    }
});
export const fetchProductbyId = (id) => async (dispatch, getState) => {
    //console.log('id', id);
    try {
        const DataDetail = getState().productDetail.data
        {
            dispatch(setLoading())
            if (!DataDetail[id]) {
                dispatch(getStart());
                const data = await getProductById(id);
                dispatch(getSuccess(data));
            }
        }

    } catch (error) {
        let errorMessage = 'Error fetching data';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }
        // store.dispatch(logout())

        dispatch(getFailure(errorMessage));
    }
};
export const { getStart, getSuccess, getFailure, resetProductDetail, setLoading } = productDetailSlice.actions;
export default productDetailSlice.reducer;
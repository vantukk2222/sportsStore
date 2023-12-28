import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../Login/signinReducer";
import { store } from "../../store";
import getBillbyIdBusiness from "../../../API/Bill/getBillbyIdBusiness";
import { toastError } from "../../../components/toastCustom";


const getBillbyIdBusiState = {
    dataGetBillbyIdBusi: [],
    loadingGetBillbyIdBusi: false,
    errorGetBillbyIdBusi: null
}

const getBillbyIdBusiSlice = createSlice({
    name: 'getBillbyIdBusi',
    initialState: getBillbyIdBusiState,
    reducers: {
        getStart: (state) => {
            state.loadingGetBillbyIdBusi = true;
            state.errorGetBillbyIdBusi = null;
        },
        getSuccess: (state, action) => {
            state.dataGetBillbyIdBusi = action.payload;
            state.loadingGetBillbyIdBusi = false;
        },
        getFailure: (state, action) => {
            state.errorGetBillbyIdBusi = action.payload;
            state.loadingGetBillbyIdBusi = false;
        },
        resetGetBillbyIdBusi: (state) => {
            return getBillbyIdBusiState; // Reset the productDetail state to its initial state
        },
    }
});
export const fetchBillbyIdBusiness = (idBusi, page, pageSize, sort, desc, state) => async (dispatch) => {

    try {
        dispatch(getStart());
        const data = await getBillbyIdBusiness(idBusi, page, pageSize, sort, desc, state);
        // console.log('get product by category', data);
        dispatch(getSuccess(data));
    } catch (error) {
        let errorMessage = 'Error fetching data of categories';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }
        // store.dispatch(logout())
        toastError('Lổi', 'Tạm thời không thể lấy đơn hàng')
        dispatch(getFailure(errorMessage));
    }
};
export const { getStart, getSuccess, getFailure, resetGetBillbyIdBusi } = getBillbyIdBusiSlice.actions;
export default getBillbyIdBusiSlice.reducer;
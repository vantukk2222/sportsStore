import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../Login/signinReducer";
import { store } from "../../store";
import putChangeInfor from "../../../API/Business/putChangeInfor";
import { toastError } from "../../../components/toastCustom";


const changeInforState = {
    dataChangeInfor: null,
    loadingChangeInfor: false,
    errorChangeInfor: null
}

const changeInforSlice = createSlice({
    name: 'changeInfor',
    initialState: changeInforState,
    reducers: {
        getStart: (state) => {
            state.loadingChangeInfor = true;
            state.errorChangeInfor = null;
        },
        getSuccess: (state, action) => {
            state.dataChangeInfor = action.payload;
            state.loadingChangeInfor = false;
        },
        getFailure: (state, action) => {
            state.errorChangeInfor = action.payload;
            state.loadingChangeInfor = false;
        },
        resetChangeInfor: (state) => {
            return changeInforState; // Reset the productDetail state to its initial state
        },
    }
});
export const ChangeInforBusiness = (idBusi, Business) => async (dispatch, getState) => {

    try {
        dispatch(getStart());
        const authToken = getState().login.authToken
        const data = await putChangeInfor(idBusi, Business, authToken);
        // console.log('get product by category', data);
        dispatch(getSuccess(data));
    } catch (error) {
        let errorMessage = 'Error fetching data of categories';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }
        toastError('Cảnh báo', 'Kiểm tra kết nối')
        // store.dispatch(logout())
        dispatch(getFailure(error.response));
    }
};
export const { getStart, getSuccess, getFailure, resetChangeInfor } = changeInforSlice.actions;
export default changeInforSlice.reducer;
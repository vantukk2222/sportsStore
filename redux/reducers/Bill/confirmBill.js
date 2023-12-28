import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";
import { toastError, toastsuccess } from "../../../components/toastCustom";
import putSale from "../../../API/Sale/putSale";
import putConfirmSell from "../../../API/Bill/putConfirmSell";


const confirmBillState = {
    dataConfirmBill: null,
    loadingConfirmBill: false,
    errorConfirmBill: null
}
const confirmBillSlice = createSlice({
    name: 'confirmBill',
    initialState: confirmBillState,
    reducers: {
        getStart: (state) => {
            state.loadingConfirmBill = true;
            state.errorConfirmBill = null;
        },
        getSuccess: (state, action) => {
            // console.log("reducer user success: ",action.payload);
            state.loadingConfirmBill = false;
            state.dataConfirmBill = action.payload;
        },

        getFailure: (state, action) => {
            state.errorConfirmBill = action.payload;
            state.loadingConfirmBill = false;
        },
        resetConfirmBill: (state) => {
            return confirmBillState
        }
    }
});

export const IsConfirmBill = (isConfirm, listSell) => async (dispatch, getState) => {
    //console.log('product infor redux', Product);
    try {
        dispatch(getStart());
        const authToken = getState().login.authToken
        const data = await putConfirmSell(isConfirm, listSell, authToken);
        //console.log('API create id product', data.data);
        dispatch(getSuccess(data));

        toastsuccess('Trang thai', `${data}`)
    } catch (error) {
        console.log(('reducer edit sale error ', error.message));
        dispatch(getFailure(error.message))
        toastError('Lổi không thể', 'Xác nhận ')
    }
    // return data
}

export const { getStart, getSuccess, getFailure, resetConfirmBill } = confirmBillSlice.actions;

export default confirmBillSlice.reducer;
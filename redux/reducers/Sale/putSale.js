import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";
import { toastError, toastsuccess } from "../../../components/toastCustom";
import putSale from "../../../API/Sale/putSale";


const editSaleState = {
    dataEditSale: null,
    loadingEditSale: false,
    errorEditSale: null
}
const editSaleSlice = createSlice({
    name: 'editSale',
    initialState: editSaleState,
    reducers: {
        getStart: (state) => {
            state.loadingEditSale = true;
            state.errorEditSale = null;
        },
        getSuccess: (state, action) => {
            // console.log("reducer user success: ",action.payload);
            state.loadingEditSale = false;
            state.dataEditSale = action.payload;
        },

        getFailure: (state, action) => {
            state.errorEditSale = action.payload;
            state.loadingEditSale = false;
        },
        resetEditSale: (state) => {
            return editSaleState
        }
    }
});

export const editSale = (Sale, idSale) => async (dispatch, getState) => {
    //console.log('product infor redux', Product);
    try {
        dispatch(getStart());
        const authToken = getState().login.authToken
        const data = await putSale(idSale, Sale, authToken);
        //console.log('API create id product', data.data);
        dispatch(getSuccess(data));
        toastsuccess('Sửa sự kiện', 'Thành công')
    } catch (error) {
        console.log(('reducer edit sale error ', error.message));
        dispatch(getFailure(error.message))
        toastError('Không thể', 'Sửa sự kiện')
    }
    // return data
}

export const { getStart, getSuccess, getFailure, resetEditSale } = editSaleSlice.actions;

export default editSaleSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import getQuantityById from "../../../API/Size/getQuantityById";
import { deleteProSize } from "../../../API/Product/deleteProSize";
import { toastError, toastsuccess } from "../../../components/toastCustom";

const deleteSizeState = {
    dataDeleteSize: null,
    loadingDeleteSize: false,
    errorDeleteSize: null
}

const deleteSizeSlice = createSlice({
    name: 'deleteSize',
    initialState: deleteSizeState,
    reducers: {
        getStart: (state) => {
            //console.log("state details:", state)
            state.loadingDeleteSize = true;
            state.errorDeleteSize = null;
        },
        getSuccess: (state, action) => {
            state.dataDeleteSize = action.payload;
            state.loadingDeleteSize = false;
        },
        getFailure: (state, action) => {
            state.errorDeleteSize = action.payload;
            state.loadingDeleteSize = false;
        },
        resetDeleteSize: (state) => {
            return deleteSizeState;
        },
    }
});
export const deleteProductSize = (idProSize) => async (dispatch, getState) => {

    try {
        dispatch(getStart());
        const authToken = getState().login.authToken
        const data = await deleteProSize(idProSize, authToken);
        if (data === 202 || data === 200) {
            toastsuccess('Xóa kích thước', 'Thành công')
        }
        dispatch(getSuccess(data));
    } catch (error) {

        toastError('Lổi', 'Tạm thời không thể xóa kích thước')
        dispatch(getFailure(errorMessage));
    }
};
export const { getStart, getSuccess, getFailure, resetDeleteSize } = deleteSizeSlice.actions;
export default deleteSizeSlice.reducer;
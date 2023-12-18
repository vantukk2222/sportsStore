import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";
import { postProductInformation } from "../../../API/Product/postProductInformation";
import { deleteProductInformation } from "../../../API/Product/deleteProductInformation";
import { toastsuccess } from "../../../components/toastCustom";


const initialDeleteProState = {

    loadingDelePro: false,
    errorDelePro: null
}
const deleteProductInformationSlice = createSlice({
    name: 'deleteProductInformation',
    initialState: initialDeleteProState,
    reducers: {
        getStartDelete: (state) => {
            state.loadingDelePro = true;
            state.errorDelePro = null;
        },
        getSuccessDelete: (state) => {
            // console.log("reducer user success: ",action.payload);
            state.loadingDelePro = false;
        },

        getFailureDelete: (state, action) => {
            state.errorDelePro = action.payload.error;
            state.loadingDelePro = false;
        }
    }
});

export const removerProductInfor = (id_Product) => async (dispatch, getState) => {
    //console.log('product infor redux', Product);
    try {
        dispatch(getStartDelete());
        const authToken = getState().login.authToken
        //  console.log("token", authToken);
        await deleteProductInformation(id_Product, authToken);
        toastsuccess('Xóa sản phẩm', 'Đã xóa')
        dispatch(getSuccess());
        return true
    } catch (error) {
        console.log(('reducer create product information error ', error.message));
        dispatch(getFailure(error.message))
    }
    // return data
}

export const { getStartDelete, getSuccessDelete, getFailureDelete } = deleteProductInformationSlice.actions;

export default deleteProductInformationSlice.reducer;
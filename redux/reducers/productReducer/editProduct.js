import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";
import putChangeState from "../../../API/Product/putChangeState";
import putProdutInfor from "../../../API/Product/putProductInfor";
import { toastError, toastsuccess } from "../../../components/toastCustom";


const editProductState = {
    dataEditProduct: null,
    loadingEditProduct: false,
    errorEditProduct: null
}
const editProductSlice = createSlice({
    name: 'editProduct',
    initialState: editProductState,
    reducers: {
        getUserStart: (state) => {
            state.loadingEditProduct = true;
            state.errorEditProduct = null;
        },
        getUsersuccess: (state, action) => {
            // console.log("reducer user success: ",action.payload);
            state.loadingEditProduct = false;
            state.dataEditProduct = action.payload;
        },

        getUserFailure: (state, action) => {
            state.errorEditProduct = action.payload;
            state.loadingEditProduct = false;
        },
        resetEditProduct: (state) => {
            return editProductState
        }
    }
});

export const editProductinf = (idProduct, Product) => async (dispatch, getState) => {
    // console.log(('reducer set user ', User));
    try {
        dispatch(getUserStart());
        const authToken = getState().login.authToken
        //  console.log(('token ', authToken));
        const data = await putProdutInfor(idProduct, Product, authToken);
        //console.log("reducer state put productinfor ", data);

        dispatch(getUsersuccess(data));
        toastsuccess('Sửa sản phẩm', 'Thành công')
    } catch (error) {
        // store.dispatch(logout())
        toastError('Lổi', 'Tạm thời không thể sửa sản phẩm')
        console.log(('Put state error ', error.message));
        dispatch(getUserFailure(error.message))
    }
    // return data
}

export const { getUserStart, getUsersuccess, getUserFailure, resetEditProduct } = editProductSlice.actions;

export default editProductSlice.reducer;
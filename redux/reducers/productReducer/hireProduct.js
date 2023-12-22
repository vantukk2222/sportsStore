import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";
import putChangeState from "../../../API/Product/putChangeState";
import postHireProduct from "../../../API/Product/postHireProduct";
import { toastError, toastsuccess } from "../../../components/toastCustom";


const hireState = {
    dataStatusHire: null,
    loadingHire: false,
    errorHire: null
}
const hireProductSlice = createSlice({
    name: 'hireProduct',
    initialState: hireState,
    reducers: {
        getUserStart: (state) => {
            state.loadingHire = true;
            state.errorHire = null;
        },
        getUsersuccess: (state, action) => {
            // console.log("reducer user success: ",action.payload);
            state.loadingHire = false;
            state.dataStatusHire = action.payload;
        },

        getUserFailure: (state, action) => {
            state.errorHire = action.payload;
            state.loadingHire = false;
        },
        resetHire: (state) => {
            return hireState
        }
    }
});

export const setHireProduct = (id, hire) => async (dispatch, getState) => {
    // console.log(('reducer set user ', User));
    try {
        dispatch(getUserStart());
        const authToken = getState().login.authToken
        //  console.log(('token ', authToken));
        const data = await postHireProduct(id, hire, authToken);
        //console.log("reducer hire ", data);
        dispatch(getUsersuccess(data));
        if (hire) {
            toastsuccess('Ẩn sản phẩm', 'Thành công')
        } else {

            toastsuccess('Hiện sản phẩm', 'Thành công')
        }
    } catch (error) {
        // store.dispatch(logout())
        console.log(('Hire error ', error.message));
        dispatch(getUserFailure(error.message))
        toastError('Ẩn sản phẩm', 'Lổi')
    }
    // return data
}

export const { getUserStart, getUsersuccess, getUserFailure, resetHire } = hireProductSlice.actions;

export default hireProductSlice.reducer;
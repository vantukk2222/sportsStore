import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";
import postSale from "../../../API/Sale/postSale";
import { toastError, toastsuccess } from "../../../components/toastCustom";


const saleState = {
    dataSale: null,
    loadingSale: false,
    errorSale: null
}
const createNewSaleSlice = createSlice({
    name: 'createNewSale',
    initialState: saleState,
    reducers: {
        getStart: (state) => {
            state.loadingSale = true;
            state.errorSale = null;
        },
        getSuccess: (state, action) => {
            // console.log("reducer user success: ",action.payload);
            state.loadingSale = false;
            state.dataSale = action.payload;
        },

        getFailure: (state, action) => {
            state.errorSale = action.payload;
            state.loadingSale = false;
        },
        resetNewSale: (state) => {
            return saleState
        }
    }
});

export const createSale = (Sale) => async (dispatch, getState) => {
    //console.log('product infor redux', Product);
    try {
        dispatch(getStart());
        const authToken = getState().login.authToken
        //  console.log("token", authToken);
        const data = await postSale(Sale, authToken);
        //console.log('API create id product', data.data);
        dispatch(getSuccess(data));
        toastsuccess('Tạo sự kiện', 'Thành công')
    } catch (error) {
        console.log(('reducer create sale error ', error.message));
        dispatch(getFailure(error.message))
        toastError('Không thể', 'Tạo sự kiện')
    }
    // return data
}

export const { getStart, getSuccess, getFailure, resetNewSale } = createNewSaleSlice.actions;

export default createNewSaleSlice.reducer;
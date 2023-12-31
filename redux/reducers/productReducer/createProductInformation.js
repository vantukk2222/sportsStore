import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";
import { postProductInformation } from "../../../API/Product/postProductInformation";


const initialState = {
    dataProductInfor: null,
    loadingProductInfor: false,
    errorProductInfor: null
}
const createProductInformationSlice = createSlice({
    name: 'createProductInformation',
    initialState,
    reducers: {
        getStart: (state) => {
            state.loadingProductInfor = true;
            state.errorProductInfor = null;
        },
        getSuccess: (state, action) => {
            // console.log("reducer user success: ",action.payload);
            state.loadingProductInfor = false;
            state.dataProductInfor = action.payload;
        },

        getFailure: (state, action) => {
            state.errorProductInfor = action.payload;
            state.loadingProductInfor = false;
        },
        resetProductInformation: (state) => {
            return initialState
        }
    }
});

export const createProductInfor = (Product) => async (dispatch, getState) => {
    console.log('product infor redux', Product);
    try {
        dispatch(getStart());
        const authToken = getState().login.authToken
        //  console.log("token", authToken);
        const data = await postProductInformation(Product, authToken);
        console.log('API create id product', data.data);
        dispatch(getSuccess(data.data));
    } catch (error) {
        console.log(('reducer create product information error ', error.message));
        dispatch(getFailure(error.message))
    }
    // return data
}

export const { getStart, getSuccess, getFailure, resetProductInformation } = createProductInformationSlice.actions;

export default createProductInformationSlice.reducer;
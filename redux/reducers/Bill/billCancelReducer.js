import { createSlice } from "@reduxjs/toolkit";
// import addToCartPage from "../../../API/addToCart/addToCartAPI";
// import cancelBillAPI from "../../../API/Bill/cancelBill";
import cancelBill from "../../../API/Bill/cancelBill"
import { getAllBillByIDUser } from "./getBillUserReducer";


const initialState = {

    status: null,
    isLoading: false,
    error: null,

};

const cancelBillSlice = createSlice({
    name: 'cancelBillReducer',
    initialState,
    reducers: {
        cancelBillRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        cancelBillSuccess: (state, action) => {
            state.status = action.payload
            state.isLoading = false;
        },

        cancelBillFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
        }
    },
});

export const cancelBillByID = (list_Id_Cart, state) => async (dispatch, getState) => {

    try {
        dispatch(cancelBillRequest()); 
        const authToken = getState().login.authToken
        const data = getState().userData.data
        console.log("Token billReducer:", authToken);
        const response = await cancelBill(list_Id_Cart, authToken, state) 
        console.log("data in Bill Reducer: ", "OKKKKKKK"); 
        dispatch(cancelBillSuccess(response));
        dispatch(getAllBillByIDUser(data?.id))
        return response

    } catch (error) {
        let errorMessage = 'Error fetching data';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }
        dispatch(cancelBillFailure({ error: errorMessage })); 
    }

    // return false
};


export const { cancelBillRequest, cancelBillSuccess, cancelBillFailure } = cancelBillSlice.actions;
export default cancelBillSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import savePaymentAPI from "../../../API/Payment/momoAPI"


const initialState = {
    data :[],
    isLoading: false,
    error: null,
};

const savePaymentSlice = createSlice({
    name: 'savePaymentReducer',
    initialState,
    reducers: {
        savePaymentRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        savePaymentSuccess: (state, action) => {
            state.data = action.payload
            state.isLoading = false;
        },

        savePaymentFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
        }
    },
});

export const savePayment = (id_user) => async (dispatch, getState) => {
    try {

        dispatch(savePaymentRequest()); // Dispatch addToCartRequest action
        const authToken = getState().login.authToken
        console.log("Token PaymentReducer:", authToken);
        const response = await savePaymentAPI(id_user, authToken) // Call addToCartPage API
        console.log("data in Payment Reducer: ", response); // Log received data


        dispatch(savePaymentSuccess( response)); // Dispatch addToCartSuccess with received data
        return response
    } catch (error) {
        let errorMessage = 'Error fetching data';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }
        dispatch(savePaymentFailure({ error: errorMessage })); // Dispatch addToCartFailure with error message
        return false
    }
};

export const { savePaymentRequest, savePaymentSuccess, savePaymentFailure } = savePaymentSlice.actions;
export default savePaymentSlice.reducer;

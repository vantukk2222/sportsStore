import { createSlice } from "@reduxjs/toolkit";
// import addToCartPage from "../../../API/addToCart/addToCartAPI";
// import saveBillAPI from "../../../API/Bill/saveBill";
import saveBillAPI from "../../../API/Bill/saveBill"


const initialState = {
  isLoading: false,
  error: null,
};

const saveBillSlice = createSlice({
  name: 'saveBillReducer',
  initialState,
  reducers: {
    saveBillRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    saveBillSuccess: (state) => {
      state.isLoading = false;
    },

    saveBillFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    }
  },
});

export const saveBill = (name, information ,total,id_user, state, bill_detailSet, list_Id_Cart) => async (dispatch, getState) => {
  try {

    dispatch(saveBillRequest()); // Dispatch addToCartRequest action
    const authToken = getState().login.authToken
    console.log("Token billReducer:", authToken);
    await saveBillAPI(name, information ,total,id_user, state, bill_detailSet, authToken) // Call addToCartPage API
    console.log("data in Bill Reducer: ", "OKKKKKKK"); // Log received data
    

    dispatch(saveBillSuccess()); // Dispatch addToCartSuccess with received data
    // console.log("state reduceraddToCart: " + JSON.stringify(getState()));
    return true
  } catch (error) {
    let errorMessage = 'Error fetching data';

    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }
    // store.dispatch(logout())
    dispatch(saveBillFailure({ error: errorMessage })); // Dispatch addToCartFailure with error message
    // return false
}
};

export const { saveBillRequest, saveBillSuccess, saveBillFailure } = saveBillSlice.actions;
export default saveBillSlice.reducer;

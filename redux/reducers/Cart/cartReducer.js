import { createSlice } from "@reduxjs/toolkit";
// import addToCartPage from "../../../API/addToCart/addToCartAPI";
import { asyncStorage } from "../../../utilies/asyncStorage";
import addToCart from "../../../API/Cart/addToCart";
import { logout } from "../Login/signinReducer";
import { store } from "../../store";
import { listCartByIdUser } from "./listCartReducer";
// {asyncStorage}


const initialState = {
  //   cart: [],
  isLoading: false,
  error: null,
};

const addToCartSlice = createSlice({
  name: 'addToCartReducer',
  initialState,
  reducers: {
    addToCartRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addToCartSuccess: (state) => {
      state.isLoading = false;
    },

    addToCartFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    }
  },
});

export const addToCartUser = (id_user, id_size, quantity) => async (dispatch, getState) => {
  try {

    dispatch(addToCartSlice.actions.addToCartRequest()); // Dispatch addToCartRequest action
    const authToken = getState().login.authToken
    console.log("Token cart Reducer:", authToken);
    const data = await addToCart(id_user, id_size, quantity, authToken); // Call addToCartPage API
    console.log("data in cartReducer: ", data.response); // Log received data
    // dispatch
    dispatch(addToCartSlice.actions.addToCartSuccess())

    
    // console.log("state reduceraddToCart: " + JSON.stringify(getState()));
    return true
  } catch (error) {
    let errorMessage = 'Error fetching data';

    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }
    // store.dispatch(logout())
    dispatch(addToCartSlice.actions.addToCartFailure({ error: errorMessage })); // Dispatch addToCartFailure with error message
    // return false
  }
};

export const { addToCartRequest, addToCartSuccess, addToCartFailure } = addToCartSlice.actions;
export default addToCartSlice.reducer;

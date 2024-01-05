import { createSlice } from "@reduxjs/toolkit";
// import addToCartPage from "../../../API/addToCart/addToCartAPI";
import { asyncStorage } from "../../../utilies/asyncStorage";
import putCart from "../../../API/Cart/putCart";
import { logout } from "../Login/signinReducer";
import { store } from "../../store";
import { listCartByIdUser } from "./listCartReducer";
// {asyncStorage}


const initialState = {
  //   cart: [],
  isLoading: false,
  error: null,
};

const putCartSlice = createSlice({
  name: 'putCartReducer',
  initialState,
  reducers: {
    putCartRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    putCartSuccess: (state) => {
      state.isLoading = false;
    },

    putCartFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    }
  },
});

export const putCartByID = (id_cart, id_user, id_size, quantity) => async (dispatch, getState) => {
  try {

    dispatch(putCartSlice.actions.putCartRequest()); // Dispatch putCartRequest action
    const authToken = getState().login.authToken
    console.log("Token Putcart Reducer:", authToken);
    await putCart(id_cart, id_user, id_size, quantity, authToken); // Call putCartPage API
    console.log("data in PutcartReducer: ", data.response); // Log received data
    // dispatch
    dispatch(putCartSlice.actions.putCartSuccess())
    await dispatch(listCartByIdUser(id_user))
    // console.log("state reducerputCart: " + JSON.stringify(getState()));
    return true
  } catch (error) {
    let errorMessage = 'Error fetching data';

    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }
    // store.dispatch(logout())
    dispatch(putCartSlice.actions.putCartFailure({ error: errorMessage })); // Dispatch putCartFailure with error message
    // return false
  }
};

export const { putCartRequest, putCartSuccess, putCartFailure } = putCartSlice.actions;
export default putCartSlice.reducer;

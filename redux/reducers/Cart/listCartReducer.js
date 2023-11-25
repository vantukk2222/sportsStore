import { createSlice } from "@reduxjs/toolkit";
// import { asyncStorage } from "../../../utilies/asyncStorage";
import addToCart from "../../../API/Cart/addToCart";
import getCartByIDUser from "../../../API/Cart/listCart";
// import { logout } from "../Login/signinReducer";
// import { store } from "../../store";


const initialState = {
  dataCart: [],
  loadingCart: false,
  errorCart: null,
};

const listCartSlice = createSlice({
  name: 'listCartReducer',
  initialState,
  reducers: {
    listCartRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    listCartSuccess: (state, action) => {
      state.dataCart =  action.payload.data
      state.isLoading = false;
    },

    listCartFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    }

  },
});

export const listCartByIdUser = (id_user) => async (dispatch, getState) => {
  try {
    console.log('Listcart request start');

    dispatch(listCartRequest()); // Dispatch addToCartRequest action
    console.log('Listcart request success');
    const data = await getCartByIDUser(id_user); // Call addToCartPage API
    console.log('Listcart get api success');

    // console.log("data in listCartReducer: ", data); // Log received data

    dispatch(listCartSuccess({data: data})); // Dispatch addToCartSuccess with received data
    // console.log("state reduceraddToCart: " + JSON.stringify(getState()));
    // return true
  } catch (error) {
    let errorMessage = 'Error fetching data';

    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }
    // store.dispatch(logout())
    dispatch(addToCartFailure({ error: errorMessage })); // Dispatch addToCartFailure with error message
    // return false
}
};

export const { listCartRequest, listCartSuccess, listCartFailure } = listCartSlice.actions;
export default listCartSlice.reducer;

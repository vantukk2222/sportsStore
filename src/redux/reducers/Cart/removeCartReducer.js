// import { createSlice } from "@reduxjs/toolkit";
// import { asyncStorage } from "../../../utilies/asyncStorage";
// import removeItemCart from "../../../API/Cart/removeItemCart";
// import getCartByIDUser from "../../../API/Cart/listCart";
// import { listCartByIdUser } from "./listCartReducer";
// import { toastError, toastsuccess } from "../../../components/toastCustom";

// const initialState = {
//   //   cart: [],
//   isLoading: false,
//   error: null,
// };
// const removeCartItemSlice = createSlice({
//   name: "removeItemCartReducer",
//   initialState,
//   reducers: {
//     removeCartItemRequest: (state) => {
//       state.isLoading = false;
//       state.error = null;
//     },
//     removeCartItemSuccess: (state) => {
//       state.isLoading = true;
//     },
//     removeCartItemFailure: (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload.error;
//     }
//   },

// });
// export const removerItemCartByID = (id_Cart) => async (dispatch, getState) => {
//   try {
//     dispatch(removeCartItemRequest())
//     const authToken = getState().login.authToken
//     const id_user = getState().userData.data.id
//     console.log("Token remove Cart:", authToken);
//     await removeItemCart(id_Cart, authToken)
//     toastsuccess("Thành công", "Bạn đã xoá sản phẩm ", id_Cart, " ra khỏi giỏ hàng")
//     dispatch(removeCartItemSuccess())
//     dispatch(listCartByIdUser(id_user))

//     return true
//   } catch (error) {
//     let errorMessage = 'Error fetching data';

//     if (error.response && error.response.data) {
//       errorMessage = error.response.data.message || errorMessage;
//     }
//     // store.dispatch(logout())
//     dispatch(removeCartItemFailure({ error: errorMessage })); // Dispatch addToCartFailure with error message
//     // return false
//   }

// }
// export const {removeCartItemFailure, removeCartItemRequest, removeCartItemSuccess} = removeCartItemSlice.actions
// export default removeCartItemSlice.reducer

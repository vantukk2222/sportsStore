// import { createSlice } from "@reduxjs/toolkit";
// import loginPage from "../../../API/Login/login";
// // Initial state
// const initialState = {
//   loading: false,
//   token: null,
//   error: null,
// };

// // Reducer
// const signUpReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SIGNUP_REQUEST':
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case 'SIGNUP_SUCCESS':
//       return {
//         ...state,
//         loading: false,
//         token: action.payload.token,
//         error: null,
//       };
//     case 'SIGNUP_FAILURE':
//       return {
//         ...state,
//         loading: false,
//         error: action.payload.error,
//       };
//     default:
//       return state;
//   }
// };

// export default signUpReducer;

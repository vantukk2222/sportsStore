// import { asyncStorage } from "../../../utilies/asyncStorage";

// const initialState = {
//   authToken: null,
//   isLoading: false,
//   error: null,
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'LOGIN_REQUEST':
//       return {
//         ...state,
//         isLoading: true,
//         error: null,
//       };
//     case 'LOGIN_SUCCESS':

//       return {
//         ...state,
//         isLoading: false,
//         authToken: action.payload.token,
//       };
//     case 'LOGIN_FAILURE':
//       return {
//         ...state,
//         isLoading: false,
//         error: action.payload.error,
//       };
//     default:
//       return state;
//   }
// };

// export default authReducer;

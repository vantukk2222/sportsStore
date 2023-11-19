// // authActions.js
// import axios from 'axios';
// import { asyncStorage } from '../../../utilies/asyncStorage';

// export const loginRequest = () => ({
//   type: 'LOGIN_REQUEST',
// });

// export const loginSuccess = (token) => ({
//   type: 'LOGIN_SUCCESS',
//   payload: { token: token },
// });

// export const loginFailure = (error) => ({
//   type: 'LOGIN_FAILURE',
//   payload: { error },
// });

// export const loginUser = (email, password) => {
//   return async (dispatch, getState) => {
//     console.log("auth state "+getState());
//     console.log("actions:     "+email + password);
//     try {
//       dispatch(loginRequest());
//       const response = await axios.post('https://project-pbl6-production.up.railway.app/api/v1/auth/signin', {
//         username: email,
//         password: password,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'accept': '*/*'
//         }
//       });
//       const { token } = response.data;

//       await asyncStorage.setAuthToken(token)
//       console.log("actions storage: " +await asyncStorage.getAuthToken())
//       dispatch(loginSuccess(token));
//       return token;
//     } catch (error) {
//       console.log("error sign in"+error.message)
//       dispatch(loginFailure(error.message));
//     }
//   };
// };

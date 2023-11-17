import axios from 'axios';
import { asyncStorage } from '../../../utilies/asyncStorage';

// Action Types
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

// Action Creators
export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

export const signupSuccess = (token) => ({
  type: SIGNUP_SUCCESS,
  payload: {token},
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: {error},
});

// Thunk to perform the signup request
export const signupUser = (userData) => {
  return async (dispatch, getState) => {
    console.log("state state "+ getState())
    console.log("signup" + userData)
    try {
        dispatch(signupRequest());
        const response = await axios.post('https://project-pbl6-production.up.railway.app/api/v1/auth/signup', userData, {
          
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*'
          }
        });
      const { token } = response.data;
      await asyncStorage.setAuthToken(token)

      dispatch(signupSuccess(response.data));
      console.log("signUp Token: " + token);
      console.log("error: " +response.data)
      return token;
      // You can handle success actions here, such as storing tokens or redirecting
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Error response body: ", JSON.stringify(error.response.data));
        // Ở đây, bạn có thể xử lý thông tin lỗi, hiển thị hoặc thực hiện các hành động khác
        return "Error: " +JSON.stringify(error.response.data)
      } else {
        console.log("Unhandled error: ", error);
      }
      dispatch(signupFailure(error.message));
    }
  };
};

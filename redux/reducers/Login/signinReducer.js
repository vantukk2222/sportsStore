import { createSlice } from "@reduxjs/toolkit";
import loginPage from "../../../API/Login/loginAPI";
import { asyncStorage } from "../../../utilies/asyncStorage";
// {asyncStorage}
const initialState = {
  authToken: 
  null,
  isLoading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.authToken = action.payload.authToken;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    setToken: (state,action)=> {
      state.isLoading = false;
      // console.log(action);
      state.authToken = action.payload;
    },
    logout: (state,action) => {
      state.authToken = null;
      state.isLoading = false;
      state.error = null;
    }
  },
});

export const loginUser = (username, password) => async (dispatch, getState) => {
  try {
    dispatch(loginSlice.actions.loginRequest()); // Dispatch loginRequest action

    const data = await loginPage(username, password); // Call loginPage API
    // console.log("data: ", data); // Log received data

    dispatch(loginSlice.actions.loginSuccess({ authToken: data })); // Dispatch loginSuccess with received data
    // console.log("state reducerLogin: " + JSON.stringify(getState()));
    return data
  } catch (error) {
    let errorMessage = 'Error fetching data';

    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }
    dispatch(loginSlice.actions.loginFailure({ error: errorMessage })); // Dispatch loginFailure with error message
  }
};

export const { loginRequest, loginSuccess, loginFailure,setToken,logout } = loginSlice.actions;
export default loginSlice.reducer;

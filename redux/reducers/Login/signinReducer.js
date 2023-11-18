import { createSlice } from "@reduxjs/toolkit";
import loginPage from "../../../API/Login/login";

const initialState = {
  authToken: null,
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
  },
});

export const loginUser = (username, password) => async (dispatch) => {
  try {
    dispatch(loginSlice.actions.loginRequest()); // Dispatch loginRequest action

    const data = await loginPage(username, password); // Call loginPage API
    console.log("data: ", data); // Log received data

    dispatch(loginSlice.actions.loginSuccess({ authToken: data })); // Dispatch loginSuccess with received data
    return data
  } catch (error) {
    let errorMessage = 'Error fetching data';

    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }
    dispatch(loginSlice.actions.loginFailure({ error: errorMessage })); // Dispatch loginFailure with error message
  }
};

export const { loginRequest, loginSuccess, loginFailure } = loginSlice.actions;
export default loginSlice.reducer;

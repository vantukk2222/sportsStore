import { createSlice } from "@reduxjs/toolkit";
import  registerPage  from "../../../API/Register/register";
import AsyncStorage from "@react-native-async-storage/async-storage";
// registerPage
const initialState = {
  token: null,
  isLoading: false,
  error: null,
};


const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    signupRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
    },
    signupFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    signupDone: (state,action) => {
      state.token = null;
      state.isLoading = false;
      state.error = null;
    }
  },
});

export const signupUser = (userData) => async (dispatch) => {
  try {
    // console.log("data: ", "nothing"); // Log received data

    dispatch(registerSlice.actions.signupRequest()); // Dispatch registerRequest action
// {registerPage}
    const data = await registerPage(userData); // Call registerPage API
    // console.log("data: ", data); // Log received data

    dispatch(registerSlice.actions.signupSuccess({ token: data })); // Dispatch registerSuccess with received data
    console.log("Token reg : ", AsyncStorage.getItem("token"));
    return data
  } catch (error) {
    let errorMessage = 'Error fetching data';

    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }
    dispatch(registerSlice.actions.signupFailure({ error: errorMessage })); // Dispatch registerFailure with error message
  }
};

export const { signupRequest, signupSuccess, signupFailure,signupDone } = registerSlice.actions;
export default registerSlice.reducer;

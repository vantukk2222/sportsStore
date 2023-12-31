import { createSlice } from "@reduxjs/toolkit";
import registerPage from "../../../API/Register/register";

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
  },
});

export const signupUser = (userData,role) => async (dispatch) => {
  try {
    console.log("data: ", userData); // Log received data

    dispatch(registerSlice.actions.signupRequest()); // Dispatch registerRequest action
// {registerPage}
    const data = await registerPage(userData,role); // Call registerPage API
    console.log("data: ", data); // Log received data

    dispatch(registerSlice.actions.signupSuccess({ token: data })); // Dispatch registerSuccess with received data
    return data
  } catch (error) {
    let errorMessage = 'Error fetching data';

    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }
    dispatch(registerSlice.actions.signupFailure({ error: errorMessage })); // Dispatch registerFailure with error message
  }
};

export const { signupRequest, signupSuccess, signupFailure } = registerSlice.actions;
export default registerSlice.reducer;

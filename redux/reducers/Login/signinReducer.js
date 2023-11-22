import { createSlice } from "@reduxjs/toolkit";
import loginPage from "../../../API/Login/loginAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { asyncStorage } from "../../../utilies/asyncStorage";
// {asyncStorage}
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
    setToken: (state,action)=> {
      state.isLoading = false;
      // console.log(action);
      state.authToken = action.payload;
    },
    logout: (state,action) => {
      state.authToken = null;
      state.isLoading = false;
      state.error = null;
      
      // {}
      // {console.log();}
    }
  },
});

export const loginUser = (username, password) => async (dispatch, getState) => {
  try {
    dispatch(loginRequest()); // Dispatch loginRequest action

    const data = await loginPage(username, password); // Call loginPage API
    console.log("data redux login: ", data); // Log received data

    dispatch(loginSuccess({ authToken: data })); // Dispatch loginSuccess with received data
    // console.log("data");
    // console.log("state reducerLogin: " + JSON.stringify(getState()));
    // console.log("Token login: ", await AsyncStorage.getItem("authToken"));
    return data
  } catch (error) {
    let errorMessage = 'Error fetching data';

    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }
    dispatch(loginFailure({ error: errorMessage })); // Dispatch loginFailure with error message
    throw error.response.message
  }
};

export const { loginRequest, loginSuccess, loginFailure,setToken,logout } = loginSlice.actions;
export default loginSlice.reducer;

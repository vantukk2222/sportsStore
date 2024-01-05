import { createSlice } from "@reduxjs/toolkit";
import loginPage from "../../../API/Login/loginAPI";
import { asyncStorage } from "../../../utilies/asyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUserByUserName } from "../User/userInfor";
// {asyncStorage}


const initialState = {
  authToken: null,
  userName: null,
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
      state.userName = action.payload.userName;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    setToken: (state, action) => {
      state.isLoading = false;
      // console.log(action);
      state.authToken = action.payload;
    },
    logout: (state) => {
      state.userName = null
      state.authToken = null;
      state.isLoading = false;
      state.error = null;
    }
  },
});

export const loginUser = (username, password) => async (dispatch, getState) => {
  try {
    await AsyncStorage.removeItem('persist:root')

    dispatch(loginRequest()); // Dispatch loginRequest action

    const data = await loginPage(username, password); // Call loginPage API
    console.log("data token in reducer signin:", data); // Log received data

    dispatch(loginSuccess({ authToken: data, userName: username })); // Dispatch loginSuccess with received data
    await dispatch(fetchUserByUserName(username))
    // console.log("state reducerLogin: " + JSON.stringify(getState()));
    return data || 404
  } catch (error) {
    await AsyncStorage.removeItem('persist:root')

    let errorMessage = 'Error fetching data';

    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }
    dispatch(loginSlice.actions.loginFailure({ error: errorMessage })); // Dispatch loginFailure with error message
    return 404
  }
};

export const { loginRequest, loginSuccess, loginFailure, setToken, logout } = loginSlice.actions;
export default loginSlice.reducer;

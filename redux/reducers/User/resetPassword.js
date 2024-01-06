import { createSlice } from "@reduxjs/toolkit";
import { resetPasswordAPI } from "../../../API/Reset/reset";

const initialState = {
  isLoading: false,
  error: null,
};


const resetSlice = createSlice({
  name: 'resetReducer',
  initialState,
  reducers: {
    resetRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    resetSuccess: (state, action) => {
      state.isLoading = false;
    },

    resetFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },

});


export const resetPasswordUser = (email) => async (dispatch) => {
  try {
    dispatch(resetSlice.actions.resetRequest()); 
    const data = await resetPasswordAPI(email); 

    dispatch(resetSlice.actions.resetSuccess()); 
    return data;
  } catch (error) {
    let errorMessage = 'Error fetching data';

    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    }
    dispatch(resetSlice.actions.resetFailure({ error: errorMessage }));
  }
};


export const { resetRequest, resetSuccess, resetFailure } = resetSlice.actions;
export default resetSlice.reducer;

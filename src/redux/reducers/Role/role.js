import { createSlice } from '@reduxjs/toolkit';
import getUnAuth from '~/API/get';

const initialState = {
    dataRole: [],
    loadingRole: false,
    errorRole: null,
};

const roleSlice = createSlice({
    name: 'roleReducer',
    initialState,
    reducers: {
        roleRequest: (state) => {
            state.loadingRole = true;
            state.errorRole = null;
        },
        roleSuccess: (state, action) => {
            // state.dataRole =  [...state.dataRole,action.payload.data]
            state.dataRole = action.payload.data;
            state.loadingRole = false;
        },
        roleFailure: (state, action) => {
            state.loadingRole = false;
            state.errorRole = action.payload.error;
        },
        roleListCart: (state) => {
            state.dataRole = null;
            state.loadingRole = false;
            state.errorRole = null;
        },
    },
});

export const roleByUserName = (un) => async (dispatch, getState) => {
    try {
      
        dispatch(roleRequest()); 
       
        if (un) {
          
            const data = await getUnAuth(`user/get-role/${un}`); 
            dispatch(roleSuccess({ data: data }));
        } else dispatch(roleListCart());
    } catch (error) {
        let errorMessage = 'Error fetching data';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }
      
    }
};

export const { roleRequest, roleSuccess, roleFailure, roleListCart } = roleSlice.actions;
export default roleSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import getUnAuth from '~/API/get';

const initialState = {
    dataCart: [],
    loadingCart: false,
    errorCart: null,
};

const listCartSlice = createSlice({
    name: 'listCartReducer',
    initialState,
    reducers: {
        listCartRequest: (state) => {
            state.loadingCart = true;
            state.errorCart = null;
        },
        listCartSuccess: (state, action) => {
            // state.dataCart =  [...state.dataCart,action.payload.data]
            state.dataCart = action.payload.data;
            state.loadingCart = false;
        },

        listCartFailure: (state, action) => {
            state.loadingCart = false;
            state.errorCart = action.payload.error;
        },
        resetStateListCart: (state) => {
            state.dataCart = null;
            state.loadingCart = false;
            state.errorCart = null;
        },
    },
});

export const listCartByIdUser = (id_user) => async (dispatch, getState) => {
    try {
    
        dispatch(listCartRequest()); 
      
        if (id_user) {
          
            const data = await getUnAuth(`cart/get-by-id-user/${id_user}`); 
           

            dispatch(listCartSuccess({ data: data }));
        } 
    } catch (error) {
        let errorMessage = 'Error fetching data';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }
       
    }
};

export const { listCartRequest, listCartSuccess, listCartFailure, resetStateListCart } = listCartSlice.actions;
export default listCartSlice.reducer;

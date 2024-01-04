import { createSlice } from '@reduxjs/toolkit';
import getUnAuth from '~/API/get';

const initialState = {
    dataBill: [],
    loadingBill: false,
    errorBill: null,
};

const listBillSlice = createSlice({
    name: 'listBillReducer',
    initialState,
    reducers: {
        listBillRequest: (state) => {
            state.loadingBill = true;
            state.errorBill = null;
        },
        listBillSuccess: (state, action) => {
            // state.dataBill =  [...state.dataBill,action.payload.data]
            state.dataBill = action.payload.data;
            state.loadingBill = false;
        },

        listBillFailure: (state, action) => {
            state.loadingBill = false;
            state.errorBill = action.payload.error;
        },
        resetStateListCart: (state) => {
            state.dataBill = null;
            state.loadingBill = false;
            state.errorBill = null;
        },
    },
});

export const listBillById = (id, role, page) => async (dispatch, getState) => {
    try {
        
        dispatch(listBillRequest()); // Dispatch addToCartRequest action
      
        if (id) {
            if (role == 'ROLE_CUSTOMER') {
                const data = await getUnAuth(`bill/get-by-id-user/${id}`);
                dispatch(listBillSuccess({ data: data }));
            }
            if (role == 'ROLE_BUSINESS') {
                let data = '';
                const state = JSON.parse(localStorage.getItem('State'));
                if (state == 5) {
                    data = await getUnAuth(`bill/get-by-business/${id}?page=${page}&page_size=10`);
                    localStorage.setItem('TotalPages', data.totalPages);
                } else {
                    data = await getUnAuth(`bill/get-by-business/${id}?page=${page}&page_size=10&state=${state}`);
                    localStorage.setItem('TotalPages', data.totalPages);
                }
                dispatch(listBillSuccess({ data: data.content }));
            }
        }
    } catch (error) {
        let errorMessage = 'Error fetching data';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }
        // store.dispatch(logout())
        // dispatch(addToCartFailure({ error: errorMessage })); // Dispatch addToCartFailure with error message
        // return false
    }
};

export const { listBillRequest, listBillSuccess, listBillFailure, resetStateListCart } = listBillSlice.actions;
export default listBillSlice.reducer;

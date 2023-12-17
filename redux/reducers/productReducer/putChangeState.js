import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";
import putChangeState from "../../../API/Product/putChangeState";


const initialState = {
    dataState: null,
    loadingSate: false,
    errorState: null
}
const putStateProductSlice = createSlice({
    name: 'putStateProduct',
    initialState,
    reducers: {
        getUserStart: (state) => {
            state.loadingSate = true;
            state.errorState = null;
        },
        getUsersuccess: (state, action) => {
            // console.log("reducer user success: ",action.payload);
            state.loadingSate = false;
            state.dataState = action.payload;
        },

        getUserFailure: (state, action) => {
            state.errorState = action.payload;
            state.loadingSate = false;
        },
        resetState: (state) => {
            return initialState
        }
    }
});

export const setStateProduct = (id, state) => async (dispatch, getState) => {
    // console.log(('reducer set user ', User));
    try {
        dispatch(getUserStart());
        const authToken = getState().login.authToken
        //  console.log(('token ', authToken));
        const data = await putChangeState(id, state, authToken);
        console.log("reducer state ", data);
        dispatch(getUsersuccess(data));
    } catch (error) {
        // store.dispatch(logout())
        console.log(('Put state error ', error.message));
        dispatch(getUserFailure(error.message))
    }
    // return data
}

export const { getUserStart, getUsersuccess, getUserFailure, resetState } = putStateProductSlice.actions;

export default putStateProductSlice.reducer;
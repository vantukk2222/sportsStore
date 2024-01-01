import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";
import putChangeIsmain from "../../../API/Product/putChangeIsmain";


const changeIsmainState = {
    dataChangeIsmain: null,
    loadingChangeIsmain: false,
    errorChangeIsmain: null
}
const changeIsmainSlice = createSlice({
    name: 'changeIsmain',
    initialState: changeIsmainState,
    reducers: {
        getUserStart: (state) => {
            state.loadingChangeIsmain = true;
            state.errorChangeIsmain = null;
        },
        getUsersuccess: (state, action) => {
            // console.log("reducer user success: ",action.payload);
            state.loadingChangeIsmain = false;
            state.dataChangeIsmain = action.payload;
        },

        getUserFailure: (state, action) => {
            state.errorChangeIsmain = action.payload;
            state.loadingChangeIsmain = false;
        },
        resetChangeIsmain: (state) => {
            return changeIsmainState
        }
    }
});

export const setChangeIsmain = (id) => async (dispatch, getState) => {
    // console.log(('reducer set user ', User));
    try {
        dispatch(getUserStart());
        const authToken = getState().login.authToken
        const data = await putChangeIsmain(id, authToken);
        dispatch(getUsersuccess(data));
    } catch (error) {
        console.log(('Put state error ', error.message));
        dispatch(getUserFailure(error.message))
    }
    // return data
}

export const { getUserStart, getUsersuccess, getUserFailure, resetChangeIsmain } = changeIsmainSlice.actions;

export default changeIsmainSlice.reducer;
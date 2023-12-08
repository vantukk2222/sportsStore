import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";
import { setInfor } from "../../../API/User/setInfor";


const initialState = {
    dataInfor: null,
    loadingInfor: false,
    errorInfor: null
}
const setInforUserSlice = createSlice({
    name: 'setInforUser',
    initialState,
    reducers: {
        getUserStart: (state) => {
            state.loadingInfor = true;
            state.errorInfor = null;
        },
        getUsersuccess: (state, action) => {
            // console.log("reducer user success: ",action.payload);
            state.loadingInfor = false;
            state.dataInfor = action.payload;
        },

        getUserFailure: (state, action) => {
            state.errorInfor = action.payload;
            state.loadingInfor = false;
        },
        reset: (state) => {
            return initialState
        }
    }
});

export const setUserInformation = (User) => async (dispatch, getState) => {
    console.log(('reducer set user ', User));
    try {
        dispatch(getUserStart());
        const authToken = getState().login.authToken
        console.log(('reducer set user ', User));
        const data = await setInfor(User.id, User, authToken);
        dispatch(getUsersuccess(data));
    } catch (error) {
        // store.dispatch(logout())
        console.log(('reducer set user error ', error.message));
        dispatch(getUserFailure(error.message))
    }
    // return data
}

export const { getUserStart, getUsersuccess, getUserFailure, reset } = setInforUserSlice.actions;

export default setInforUserSlice.reducer;
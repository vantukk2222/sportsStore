import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import getUserByUserName from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";

const initialState = {
    data: [],
    loading: false,
    error: null
}
const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        getUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getUsersuccess: (state, action) => {
            // console.log("reducer user success: ",action.payload);
            state.loading = false;
            state.data = action.payload;
        },

        getUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        resetUser: (state) => {
            return initialState;
        }
    }
});

export const fetchUserByUserName = (userName) => async (dispatch) => {
    try {
        dispatch(getUserStart());
        const data = await getUserByUserName(userName);
        dispatch(getUsersuccess(data));

    } catch (error) {
        store.dispatch(logout())

        dispatch(getUserFailure(error.message))
    }
    // return data
}

export const { getUserStart, getUsersuccess, getUserFailure, resetUser } = userSlice.actions;

export default userSlice.reducer;
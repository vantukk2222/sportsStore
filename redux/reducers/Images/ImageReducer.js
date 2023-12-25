import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";
import { postImage } from "../../../API/Images/postImage";
import { toastError } from "../../../components/toastCustom";


const imageState = {
    dataImage: null,
    loadingImage: false,
    errorImage: null
}
const createImageSlice = createSlice({
    name: 'createImage',
    initialState: imageState,
    reducers: {
        getStart: (state) => {
            state.loadingImage = true;
            state.errorImage = null;
        },
        getSuccess: (state, action) => {
            // console.log("reducer user success: ",action.payload);
            state.loadingImage = false;
            state.dataImage = action.payload;
        },

        getFailure: (state, action) => {
            state.errorImage = action.payload;
            state.loadingImage = false;
        },
        resetImage: (state) => {
            return imageState
        }
    }
});

export const createImages = (Image) => async (dispatch, getState) => {

    try {
        dispatch(getStart());
        const authToken = getState().login.authToken
        console.log("token", authToken);
        const data = await postImage(Image, authToken);
        dispatch(getSuccess(data));
    } catch (error) {
        // store.dispatch(logout())
        console.log(('reducer set user error ', error.message));
        toastError('Lổi', 'Không thể thêm ảnh')
        dispatch(getFailure(error.message))
    }
    // return data
}

export const { getStart, getSuccess, getFailure, resetImage } = createImageSlice.actions;

export default createImageSlice.reducer;
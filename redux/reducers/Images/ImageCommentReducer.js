import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";
import { postImage } from "../../../API/Images/postImage";
import { toastError } from "../../../components/toastCustom";


const ImageCommentState = {
    dataImageComment: {},
    loadingImageComment: false,
    errorImageComment: null
}

const createImageCommentSlice = createSlice({
    name: 'createImageComment',
    initialState: ImageCommentState,
    reducers: {
        getStart: (state) => {
            state.loadingImageComment = true;
            state.errorImageComment = null;
        },
        getSuccess: (state, action) => {
            const { id, data } = action.payload;
            state.dataImageComment = {
                ...state.dataImageComment,
                [id]: { ...data }
            };
            state.loadingImageComment = false;
        },
        
        getFailure: (state, action) => {
            state.errorImageComment = action.payload;
            state.loadingImageComment = false;
        },
        resetImageComment: (state) => {
            return ImageCommentState
        }
    }
});

export const createImageComment = (Image, id_product_information) => async (dispatch, getState) => {

    try {
        dispatch(getStart());
        const authToken = getState().login.authToken
        console.log("token", authToken);
        const data = await postImage(Image, authToken);
        dispatch(getSuccess({data: data, id: id_product_information}));
    } catch (error) {
        // store.dispatch(logout())
        console.log(('reducer set user error ', error.message));
        toastError('Lổi', 'Không thể thêm ảnh')
        dispatch(getFailure(error.message))
    }
    return data
}

export const { getStart, getSuccess, getFailure, resetImageComment } = createImageCommentSlice.actions;

export default createImageCommentSlice.reducer;
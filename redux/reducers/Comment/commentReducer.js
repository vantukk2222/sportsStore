import { createSlice } from "@reduxjs/toolkit";
// import getUserByID from "../../../API/User/getUser";
import { store } from "../../store";
import { startMapper } from "react-native-reanimated";
import { postComment } from "../../../API/Comments/postComment";
import { toastError } from "../../../components/toastCustom";


const commentState = {
    loadingComment: false,
    errorComment: null
}

const createCommentSlice = createSlice({
    name: 'createComment',
    initialState: commentState,
    reducers: {
        getStart: (state) => {
            state.loadingComment = true;
            state.errorComment = null;
        },
        getSuccess: (state) => {
            // console.log("reducer user success: ",action.payload);
            state.loadingComment = false;
        },

        getFailure: (state, action) => {
            state.errorComment = action.payload;
            state.loadingComment = false;
        },
        resetComment: (state) => {
            return commentState
        }
    }
});

export const createComment = (Comment) => async (dispatch, getState) => {
    try {
        dispatch(getStart());
        const authToken = getState().login.authToken;
        console.log("token", authToken);
        const response = await postComment(Comment, authToken);

        if (response.status >= 200 && response.status < 300) {
            dispatch(getSuccess());
        } else if (response.status === 401) {
            // Xử lý trường hợp unauthorized
            throw new Error("Unauthorized");
        } else if (response.status === 404) {
            // Xử lý trường hợp không tìm thấy resource
            throw new Error("Not found");
        } else {
            // Xử lý các status lỗi khác
            console.log("Lỗi cái đ gì vailoluon");
            throw new Error(`Error: ${response.status}`);
        }
        return true
    } catch (error) {


        console.error(('reducer post comment error ', error.message));
        toastError('Lỗi', 'Không thể thêm bình luận');
        dispatch(getFailure(error.message));
        return false
    }
};


export const { getStart, getSuccess, getFailure, resetComment } = createCommentSlice.actions;

export default createCommentSlice.reducer;
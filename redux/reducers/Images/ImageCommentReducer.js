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
            // const { data: data_detail, id: id_product_information } = action.payload;

            // state.dataImageComment = {
            //     ...state.dataImageComment,
            //     [id_product_information]: [
            //         ...state.dataImageComment[id_product_information].data_detail,
            //         data_detail,
            //     ],
            // };
            const { data: newData, id: id_product_information } = action.payload;
            const existingDataArray = state.dataImageComment[id_product_information] || [];
            if (!Array.isArray(existingDataArray)) {
                state.dataImageComment[id_product_information] = [newData];
            } else {
                // Concatenate the new data to the existing array.
                state.dataImageComment[id_product_information] = [...existingDataArray, newData];
            }            console.log("\n\ndataa img: ",state.dataImageComment[id_product_information] + "\n\n");
            state.loadingImageComment = false;
        },

        getFailure: (state, action) => {
            state.errorImageComment = action.payload;
            state.loadingImageComment = false;
        },
        resetImageComment: (state) => {
            state.dataImageComment ={}
        }
    }
});

export const createImageComment = (Image, id_product_information) => async (dispatch, getState) => {
    let data = null; // Định nghĩa biến data bên ngoài khối try

    try {
        dispatch(getStart());
        console.log("bắt đầu up ảnh");
        const authToken = getState().login.authToken

        console.log("token ảnh", authToken);
        data = await postImage(Image, authToken);
        dispatch(getSuccess({ data: data, id: id_product_information }));
        console.log("thành công up ảnh", data);
        
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
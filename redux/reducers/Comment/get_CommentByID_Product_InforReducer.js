import getCommentByID from "../../../API/Comments/getComment";

const { createSlice } = require("@reduxjs/toolkit")

const initialStateComment = {
    data: {},
    isLoading: false,
    error: null
}

const getCommentSlice = createSlice({
    name: 'getCommentReducer',
    initialState: initialStateComment,
    reducers: {
        getStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getSuccess: (state, action) => {
            state.data = action.payload
            state.isLoading = false;
        },
        getFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        resetCommentProduct: (state) => {
            state.data = {};
            state.isLoading = false;
            state.error = null
        },
    }
})

export const getCommentByIDProducInfor = (id_product_infor, page) => async (dispatch, getState) => {
    try {
        dispatch(getStart());
        console.log("getStart GetComment Success");
        const response = await getCommentByID(id_product_infor, page);
        console.log("Call API GetComment Success");

        if (response.status >= 200 && response.status < 300) {
            console.log("Response success", response.data);

            dispatch(getSuccess(response.data));

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
        return response.status || true
    } catch (error) {


        console.error(('reducer post comment error ', error.message));
        toastError('Lỗi', 'Không thể thêm bình luận');
        dispatch(getFailure(error.message));
        return false
    }
};

export const { getStart, getSuccess, getFailure, resetCommentProduct } = getCommentSlice.actions;
export default getCommentSlice.reducer;
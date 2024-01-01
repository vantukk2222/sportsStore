import { createSlice } from "@reduxjs/toolkit";
import getStatistic from "../../../API/Statistic/getStatistic";
import { toastError } from "../../../components/toastCustom";
import getMostSoldProduct from "../../../API/Statistic/getMostSoldProduct";

const findMostSoldProductState = {
    dataFindMostSoldProduct: null,
    loadingFindMostSoldProduct: false,
    errorFindMostSoldProduct: null
}

const findMostSoldProductSlice = createSlice({
    name: 'findMostSoldProduct',
    initialState: findMostSoldProductState,
    reducers: {
        getStart: (state) => {
            //console.log("state details:", state)
            state.loadingFindMostSoldProduct = true;
            state.errorFindMostSoldProduct = null;
        },
        getSuccess: (state, action) => {
            state.dataFindMostSoldProduct = action.payload;
            state.loadingFindMostSoldProduct = false;
            // console.log(state.dataFindMostSoldProduct);
        },
        getFailure: (state, action) => {
            state.errorFindMostSoldProduct = action.payload;
            state.loadingFindMostSoldProduct = false;
        },
        resetFindMostSoldProduct: (state) => {
            return findMostSoldProductState;
        },
    }
});
export const fetchMostSoldProduct = (idBusiness, state, page, pageSize, desc) => async (dispatch) => {

    try {
        dispatch(getStart());
        const data = await getMostSoldProduct(idBusiness, state, page, pageSize, desc);
        //console.log('data', data);
        dispatch(getSuccess(data));
    } catch (error) {
        toastError('Lổi không thể lấy kết quả thống kê', 'Vui lòng thử lại sau')
        dispatch(getFailure(error.response));
    }
};
export const { getStart, getSuccess, getFailure, resetFindMostSoldProduct } = findMostSoldProductSlice.actions;
export default findMostSoldProductSlice.reducer;
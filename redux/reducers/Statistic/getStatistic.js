import { createSlice } from "@reduxjs/toolkit";
import getStatistic from "../../../API/Statistic/getStatistic";
import { toastError } from "../../../components/toastCustom";

const getStatisticState = {
    dataGetStatisticState: null,
    loadingGetStatisticState: false,
    errorGetStatisticState: null
}

const getStatisticSlice = createSlice({
    name: 'getStatistic',
    initialState: getStatisticState,
    reducers: {
        getStart: (state) => {
            //console.log("state details:", state)
            state.loadingGetStatisticState = true;
            state.errorGetStatisticState = null;
        },
        getSuccess: (state, action) => {
            state.dataGetStatisticState = action.payload;
            state.loadingGetStatisticState = false;
        },
        getFailure: (state, action) => {
            state.errorGetStatisticState = action.payload;
            state.loadingGetStatisticState = false;
        },
        resetStatistic: (state) => {
            return getStatisticState;
        },
    }
});
export const fetchStatistic = (idBusiness, state, startDate, endDate) => async (dispatch) => {

    try {
        dispatch(getStart());
        const data = await getStatistic(idBusiness, state, startDate, endDate);
        dispatch(getSuccess(data));
    } catch (error) {
        let errorMessage = 'Error fetching data get product by size';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }

        toastError('Lổi không thể lấy kết quả thống kê', 'Vui lòng thử lại sau')

        dispatch(getFailure(errorMessage));
    }
};
export const { getStart, getSuccess, getFailure, resetStatistic } = getStatisticSlice.actions;
export default getStatisticSlice.reducer;
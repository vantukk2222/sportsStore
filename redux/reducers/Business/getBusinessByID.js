import getBusinessInformation from "../../../API/Business/getBusiness";
const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    businessInfor: {},
    isLoading: false,
    error: null
}

const getBusinessByIDSlice = createSlice({
    name: 'getBusinessByIDReducer',
    initialState,
    reducers: {
        getBusinessRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getBusinessSuccess: (state, action) => {
            const data_detail = { ...action.payload };
            state.businessInfor[`${data_detail.id}`] = data_detail
            // state.businessInfor = action.payload;
            state.isLoading = false;
            state.error = null
        },
        getBusinessFailure: (state, payload) => {
            state.error = action.payload
            state.isLoading = false;
        }
    }

})
export const getInforBusinessByID = (id_business) => async (dispatch, getState) => {

    try {
        dispatch(getBusinessRequest())
        // const businessArr = getState().getBusinessByIDReducer.businessInfor
        // if (businessArr[id_business] === null) {
            const response = await getBusinessInformation(id_business)
            // console.log("data business in reducer: ", response);
            dispatch(getBusinessSuccess(response))
        // }

    } catch (error) {
        let errorMessage = 'Error fetching data of categories';

        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        }
        // store.dispatch(logout())
        dispatch(getBusinessFailure(errorMessage));

    }
}
export const { getBusinessRequest, getBusinessSuccess, getBusinessFailure } = getBusinessByIDSlice.actions;
export default getBusinessByIDSlice.reducer
import getAllBillUser from "../../../API/Bill/getAllBillUser";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    dataBill: [],
    isLoading: false,
    error: null,
}

const getAllBillSlice = createSlice({
    name: 'getAllBillReducer',
    initialState,
    reducers: {
      getAllBillStart: (state) => {
        state.isLoading = true;
        state.error = null;
      },
      getAllBillSuccess: (state, action) => {
        state.dataBill = action.payload
        state.isLoading = false;
      },
  
      getAllBillFailure: (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      }
    },
  });

  export const getAllBillByIDUser = (id_user) => async (dispatch) =>{
    try {
        dispatch(getAllBillStart())
        const data = await getAllBillUser(id_user)
        dispatch(getAllBillSuccess(data))
        console.log("dispatch get all bill by id user DONE");
        
    } catch (error) {
        dispatch(getAllBillFailure(error))
    }

  }
  export const {getAllBillFailure, getAllBillStart, getAllBillSuccess} = getAllBillSlice.actions
  export default getAllBillSlice.reducer;
import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
import { urlAPI } from "../apiAddress";
import { toastError } from "../../components/toastCustom";
const getStatistic = async (idBusiness, state, startDate, endDate) => {
    //var authToken = await asyncStorage.getAuthToken();
    // console.log(authToken);
    try {
        const response = await axios.get(urlAPI + `/api/v1/bill/statistic`, {
            params: {
                state: state,
                idBusiness: idBusiness,
                startDate: startDate,
                endDate: endDate

            }
            // headers: {
            //     'Authorization': `Bearer ${authToken}`,
            //     'Content-Type': 'application/json',
            // },
        });
        return response.data;
    } catch (error) {
        // console.error(error.response.data.message);
        throw error;
    }
};

export default getStatistic;

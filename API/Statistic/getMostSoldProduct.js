import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
import { urlAPI } from "../apiAddress";
import { toastError } from "../../components/toastCustom";
const getMostSoldProduct = async (idBusiness, state, page, pageSize, desc) => {
    //var authToken = await asyncStorage.getAuthToken();
    // console.log(authToken);
    try {
        const response = await axios.get(urlAPI + `/api/v1/product-information/find-most-sold-products`, {
            params: {
                state: state,
                idBusiness: idBusiness,
                page: page,
                page_size: pageSize

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

export default getMostSoldProduct;

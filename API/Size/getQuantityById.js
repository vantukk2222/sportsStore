import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
import { urlAPI } from "../apiAddress";
const getQuantityById = async (id) => {
    //var authToken = await asyncStorage.getAuthToken();
    // console.log(authToken);
    try {
        const response = await axios.get(urlAPI+`/api/v1/product/get-quantity/${id}`, {
            // headers: {
            //     'Authorization': `Bearer ${authToken}`,
            //     'Content-Type': 'application/json',
            // },
        });

        //console.log('call API get quality by id : ', { id });
        return response.data;
    } catch (error) {
        // console.error(error.response.data.message);
        throw error;
    }
};

export default getQuantityById;

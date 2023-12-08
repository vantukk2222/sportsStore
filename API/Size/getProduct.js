import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
import { urlAPI } from "../apiAddress";
const getSizeProduct = async (id) => {
    //var authToken = await asyncStorage.getAuthToken();
    // console.log(authToken);
    try {
        const response = await axios.get(urlAPI+`/api/v1/product/${id}`, {
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

export default getSizeProduct;

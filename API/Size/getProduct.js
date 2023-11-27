import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
const getSizeProduct = async (id) => {
    //var authToken = await asyncStorage.getAuthToken();
    // console.log(authToken);
    try {
        const response = await axios.get(`https://project-pbl6-production.up.railway.app/api/v1/product/${id}`, {
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

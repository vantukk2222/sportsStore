import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
import { urlAPI } from "../apiAddress";
const searchProduct = async (name, state) => {
    // var authToken = await asyncStorage.getAuthToken();
    try {
        const response = await axios.get(urlAPI+'/api/v1/product-information/search', {
            params: {
                name: name,
                state: state
            },
            headers: {
                // 'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });
        // console.log('call API search ');
        return response.data.content;
    } catch (error) {
        console.error('Error fetching data: ', error);
        console.log(error.response);
        throw error;
    }
};

export default searchProduct;

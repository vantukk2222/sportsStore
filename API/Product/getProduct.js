import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
import { urlAPI } from "../apiAddress";
const getProduct = async (page, pageSize, sort, desc) => {
    // var authToken = await asyncStorage.getAuthToken();
    //console.log(authToken);

    try {
        console.log("page: ", page,pageSize, sort, desc);
        const response = await axios.get(urlAPI+'/api/v1/product-information', {
            params: {
                page: page,
                page_size: pageSize,
                sort: sort,
                desc: desc,
                state: 0,
                state_business: 0,
            },
            headers: {
                // 'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });

        // console.log('call API get product ', response);
        return response.data;
    } catch (error) {
        //  console.error('Error fetching data: ', error);
        // console.log(error.response);
        throw error;
    }
};

export default getProduct;

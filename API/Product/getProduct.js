import axios from "axios";
import { asyncStorage } from "../../utilies/asyncStorage";
const getProduct = async (page, pageSize, sort, desc) => {
    var authToken = await asyncStorage.getAuthToken();
    //console.log(authToken);

    try {
        const response = await axios.get('https://project-pbl6-production.up.railway.app/api/v1/product', {
            params: {
                page: page,
                page_size: pageSize,
                sort: sort,
                desc: desc
            },
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });

        // console.log('call API get product ', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        console.log(error.response);
        throw error;
    }
};

export default getProduct;

import axios from "axios";
import { api } from "~/API/url";

const getProductInfor = async (page, pageSize, sort, desc,state) => {
    // var authToken = await asyncStorage.getAuthToken();
    //console.log(authToken);

    try {
        const response = await axios.get(api+'product-information', {
            params: {
                page: page,
                page_size: pageSize,
                sort: sort,
                desc: desc,
                state:state,
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

export default getProductInfor;
